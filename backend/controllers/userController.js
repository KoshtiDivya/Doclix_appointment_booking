import validator from 'validator';
import bycrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import {v2 as cloudinary} from 'cloudinary';
import jwt from 'jsonwebtoken';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay';
//API to register user
const registerUser = async (req, res) => {
     try {
         const { name, email, password } = req.body;
         if (!name || !email || !password) {
            return res.json({success : false, message: "All fields are required"});
         }
         if (!validator.isEmail(email)) {
            return res.json({success : false, message: "Please enter a valid email"});
         }
         if (password.length < 8) {
             return res.json({success : false, message: "Please enter a strong password"});
         }

         //hashing password
         const salt = await bycrypt.genSalt(10);
         const hasedPassword = await bycrypt.hash(password, salt);

         const userData = {
             name, email, password: hasedPassword
         }

         const newUser = new userModel(userData);
         const user = await newUser.save();
         
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
         res.json({ success: true, token });
     } catch (error) {
         console.error(error);
        res.json({success: false, message : error.message});
     }
    
}
/// API to login user

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({success : false, message: "All fields are required"});
        }

        const user = await userModel.findOne({ email });
        if (!user) {
             return res.json({success : false, message: "User not exist, please register first"});
        }
        const match = await bycrypt.compare(password, user.password)
        if (match) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        res.json({success: false, message : error.message});
    }
}

//API to get user details
const getUserDetails = async (req, res) => {
    try {
        const userId  = req.userId;
        const userData = await userModel.findById(userId).select('-password')
        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.json({success: false, message : error.message});
    }
}
//API to update user details
const updateProfile = async (req, res) => {
    try {
        const userId  = req.userId;
        const { name, phone, address, dob, gender } = req.body;
        const  imageFile = req.file ;
        if (!name || !phone || !address || !dob || !gender) {
            return res.json({success : false, message: "Data Missing"});
        }
        await userModel.findByIdAndUpdate(userId, {
            name, phone, address : JSON.parse(address), dob, gender
        })
        if (imageFile) {
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            const imageUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, {image : imageUrl})
        }
        res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({success: false, message : error.message});
    }
}
//API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const { docId, slotDate, slotTime } = req.body;

        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData.available) {
            res.json({ success: false, message: "Doctor not available" });
        }
        let slots_booked = docData.slots_booked;
        

        //checking for slots availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }
        
        const userData = await userModel.findById(userId).select('-password');
        delete docData.slots_booked;

        const appointmentData = {
            userId, doctorId: docId, userData, doctorData: docData, amount: docData.fees, slotDate, slotTime, date: Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();
   
        //saves new slot into doctor model  
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        res.json({ success: true, message: "Appointment booked successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//API to get list of appointments
const listAppointments = async (req, res) => {
    try {
        const userId = req.userId;
        const appointments = await appointmentModel.find({ userId })
        // console.log(appointments)
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        //verifying if appointment belongs to user
        if (appointmentData.userId !== userId) {
            return res.json({success: false, message:"Unauthorized access"});
        }
        //removing appointment from appointment model
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        //removing slot from doctor's booked slots
        const { doctorId, slotDate, slotTime } = appointmentData;
        const dotorData = await doctorModel.findById(doctorId);

        let slots_booked = dotorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
        await doctorModel.findByIdAndUpdate(doctorId, { slots_booked });

        res.json({success : true, message : "Appointment cancelled successfully"});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
//API for online payment using razorpay
const paymentRazorpay = async (req, res) => {
    try {
         const { appointmentId } = req.body;
         const appointmentData = await appointmentModel.findById(appointmentId);
         if (!appointmentData || appointmentData.cancelled) {
            return res.json({success:false, message : "appointment cancelled or not found"})
        }
    
        //creating options for razorpay
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt : appointmentId
        }
    
        //creation of order
        const order = await razorpayInstance.orders.create(options);
        res.json({success : true, order})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
   
}


//API to varify razorpay payment
const verifyRazorpay = async(req, res) => {
      try {
          const { razorpay_order_id } = req.body;
          const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
          console.log(orderInfo);

          if (orderInfo.status === 'paid') {
              await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
              res.json({success : true, message : "Payment Successful"})
          } else {
              res.json({success : false, message : "Payment failed"})
          }

      } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
      }
}
export { registerUser, userLogin, getUserDetails,updateProfile, bookAppointment, listAppointments, cancelAppointment, paymentRazorpay, verifyRazorpay};

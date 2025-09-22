import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
///API for add doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file;
        
        //checking all data for add into database
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({success: false, message : "Some details are Missing..."})
        }
        
        //validating email formate
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email..." })
        }

        //validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password..." })
        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url
        
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            experience,
            speciality,
            degree,
            fees,
            about,
            address: JSON.parse(address),
            date : Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success : true, message : "Doctor added.."})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

// ---------------------------api for admin login--------------------
const adminLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({ success: true, token })
            
        } else {
            res.json({success : false, message :"Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

//API to get all doctors
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password");
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

//API to get all appointments

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.json({success : true, appointments})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

///API for appointment cancel
const appointmentCancel = async (req, res) => {
    try {
        
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        //releasing doctor slot
        const { doctorId, slotDate, slotTime } = appointmentData;
        const docData = await doctorModel.findById(doctorId);
        let slots_booked = docData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

        await doctorModel.findByIdAndUpdate(doctorId, { slots_booked })
        
        res.json({ success: true, message: "Appointment cancelled" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to get dashboard data in admin panel
const adminDashboard = async (req, res) => {
        try {
            
            const doctors = await doctorModel.find({});
            const appointments = await appointmentModel.find({});
            const users = await userModel.find({});

            const dashData = {
                doctors: doctors.length,
                appointments: appointments.length,
                patients: users.length,
                latestAppointments : appointments.reverse().slice(0, 5)
            }

            res.json({ success: true, dashData });

        } catch (error) {
            console.log(error)
            res.json({success : false, message : error.message})
        }
}
export { addDoctor, adminLogin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard};
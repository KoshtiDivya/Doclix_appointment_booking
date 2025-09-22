import doctorModel  from "../models/doctorModel.js";
import appointmentModel from '../models/appointmentModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {
            available : !docData.available
        })
        res.json({success : true, message : "Availability changed successfully"})
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(["-password", "-email"]);
        res.json({success : true, doctors})
    } catch (error) {
         res.json({ success: false, message: error.message });
    }
}

// --------------------API to doctor login

const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({email});

        if(!doctor){
            return res.json({success : false, message : "Doctor not Found"})
        }
        
        const isMatch = await bcrypt.compare(password, doctor.password);

        if (isMatch) {
    
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
            
        } else {
            return res.json({ success: false, message: "Invalid credential" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//API to get doctor appointments for doctor panel

const doctorAppointments = async (req, res) => {
    try {
        const doctorId  = req.doctorId;    
        const appointments = await appointmentModel.find({ doctorId });
        
        return res.json({success : true, appointments})
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//API to appointment completion by doctor
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true, payment : true });
            return res.json({ success: true, message: "Appointment completed successfully" });
        } else {
              return res.json({success : false, message : "Marked fail"})
        }
      
    } catch (error) {
         res.json({ success: false, message: error.message });
    }
}

//API to cancel appointment by doctor
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ success: true, message: "Appointment cancelled" });
        } else {
              return res.json({success : false, message : "cancellation fail"})
        }
      
    } catch (error) {
         res.json({ success: false, message: error.message });
    }
}

///-------------------API to get dashboard data for doctor panel
const doctorDashboardData = async (req, res) => {
    try {
        const doctorId  = req.doctorId;    
        const appointmentData = await appointmentModel.find({ doctorId });
        let earnings = 0;
        appointmentData.map((item) => {
            if (item.isCompleted && item.payment) {
                earnings += item.amount;
            }
        })

        let patients = [];
        appointmentData.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        })
        
        const dashData = {
            earnings,
            appointments: appointmentData.length,
            patients: patients.length,
            latestAppointments: appointmentData.reverse().slice(0,5),
        }

        res.json({success : true, dashData})
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//---------------------------API to get doctor profile data for doctor panel

const doctorProfile = async (req, res) => {
    try {
        const docId = req.doctorId; 
        const profileData = await doctorModel.findById(docId).select("-password");

        res.json({ success: true, profileData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//API to update doctor profile data for doctor panel
const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.doctorId; 
        const { fees, address, available } = req.body; 
        console.log(req.body);
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
        res.json({ success: true, message: "Profile updated successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
        console.log(error.message);
    }
}

export {changeAvailability, doctorList, doctorLogin, doctorAppointments, appointmentComplete, appointmentCancel, doctorDashboardData, updateDoctorProfile, doctorProfile} ;
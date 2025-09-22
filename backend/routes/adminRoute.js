import express from "express";
import { addDoctor, adminDashboard, adminLogin, allDoctors, appointmentCancel, appointmentsAdmin } from "../controllers/adminController.js";
import upload from "../middlewares/multur.js";
import authAdmin from "../middlewares/adminAuth.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single("image"), addDoctor)
adminRouter.post('/login', upload.none(), adminLogin)
adminRouter.get("/all-doctors",authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel);
adminRouter.get('/dashboard', authAdmin, adminDashboard);

// adminRouter.get("/get-doctor", (req, res) => { res.send("Get Doctor api called") });
export default adminRouter
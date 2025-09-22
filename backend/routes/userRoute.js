import express from 'express';
import { bookAppointment, cancelAppointment, getUserDetails, listAppointments, paymentRazorpay, registerUser, updateProfile, userLogin, verifyRazorpay } from '../controllers/userController.js';
import authUser  from '../middlewares/authUser.js';
import upload from '../middlewares/multur.js';
const userRouter = express.Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', userLogin);
userRouter.get('/get-profile', authUser, getUserDetails);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/appointments', authUser, listAppointments);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
userRouter.post('/verify-razorpay', authUser, verifyRazorpay);
export default userRouter;
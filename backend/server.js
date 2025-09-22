import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

//app config
const app = express();
const port = process.env.PORT || 8000;
connectDB();
connectCloudinary();

//middlewares

app.use(cors());
app.use(express.json());

//api endpoint
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
///localhost:8000/api/admin/add-doctor
app.get("/", (req, res) => {
    res.send("API WORKING ");
})

app.listen(port , ()=>console.log("Server running on PORT : ", port))
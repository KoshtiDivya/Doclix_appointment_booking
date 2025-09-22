import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
const MyAppointments = () => {
  const navigate = useNavigate();
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const slotDateFromat = (slotDate) => {
        const dateArray = slotDate.split("_");
        return dateArray[0] + " " + months[Number(dateArray[1])-1] + ", " + dateArray[2];
    }
  const getUserAppointments = async () => {
    try { 
      const { data } = await axios.get(backendUrl + "/api/user/appointments", { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse());
        // console.log(data.appointments)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/cancel-appointment", { appointmentId }, { headers: { token } })
      if(data.success){
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name : "Appointment payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {

         console.log(response)
        try {
            const { data } = await axios.post(backendUrl + "/api/user/verify-razorpay",response,  { headers: { token } });
            if(data.success){
              getUserAppointments();
              navigate("/my-appointments")
            }
          } catch (error) {
            console.log(error);
            toast.error(error.message);
          }

       }
    }
    const rzp = new window.Razorpay(options);
    rzp.open()
  }
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/payment-razorpay", { appointmentId }, { headers: { token } })
      if(data.success){
        // console.log(data.order);
        initPay(data.order)
    
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  },[token])
  return  (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {
          appointments.map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b mt-1 pb-3' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={item.doctorData.image} alt="" />
              </div>
              <div className='text-sm flex-1 text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.doctorData.name}</p>
                <p>{item.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.doctorData.address.line1}</p>
                <p className='text-xs'>{item.doctorData.address.line2}</p>
                <p className='text-xs mt-1'><span className='font-medium text-neutral-700'>Date & Time :</span> {slotDateFromat(item.slotDate)} | {item.slotTime} </p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                {!item.payment && !item.cancelled && !item.isCompleted && <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-500'>Pay Online</button>}
                {item.payment && !item.cancelled && !item.isCompleted && <p className='text-sm text-stone-500 text-center bg-green-200 sm:min-w-48 py-2 border rounded'>Paid</p>} 
                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-500'>Cancle appointment</button>}
                {item.cancelled && !item.isCompleted && <p className='text-sm text-red-600 text-center sm:min-w-48 py-2 border border-red-500 rounded'>Appointment Cancelled</p>}
                {item.isCompleted && <p className='text-sm text-green-600 text-center sm:min-w-48 py-2 border border-green-500 rounded'>Appointment Completed</p>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments

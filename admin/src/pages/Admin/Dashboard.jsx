import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
   
  const { getDashData, aToken, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])
  
  return dashData && (
    <div className='m-5 w-full max-w-6xl'> 
      
      {/* ----------------------first part---------------------------- */}
      <div className='flex gap-3 flex-wrap'>

        <div className='flex items-center bg-white gap-2 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <div><img className='w-14' src={assets.doctor_icon} alt="" /></div>
          <div>
            <p className='text-l text-gray-600 font-semibold'>{dashData.doctors}</p>
            <p className='text-gray-500 text-sm '>Doctors</p>
          </div>
        </div>

        <div className='flex items-center bg-white gap-2 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <div><img className='w-14' src={assets.appointments_icon} alt="" /></div>
          <div>
            <p className='text-l text-gray-600 font-semibold'>{dashData.appointments}</p>
            <p className='text-gray-500 text-sm '>Appointments</p>
          </div>
        </div>

        <div className='flex items-center bg-white gap-2 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <div><img className='w-14' src={assets.patients_icon} alt="" /></div>
          <div>
            <p className='text-l text-gray-600 font-semibold'>{dashData.patients}</p>
            <p className='text-gray-500 text-sm '>Patients</p>
          </div>
        </div>

      </div>
      
      {/* ----------------------------second part------------------- */}
      <div className='bg-white rounded-lg'>

        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 border border-b'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Booking</p>
        </div>
        
      { dashData.latestAppointments && 
          <div className='pt-4 border'>
          {
          dashData.latestAppointments.map((item, index) => (
            <div key={index} className='p-3 flex items-center px-6 py-3 gap-3 hover:bg-gray-100'>
              <img className='w-10 rounded-full bg-gray-200' src={item.doctorData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.doctorData.name}</p>
                <p className='text-gray-600 text-sm'>Booking on {slotDateFormat(item.slotDate) }</p>
              </div>
               {
                item.cancelled
                  ? <p className='text-red-700 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-700 text-xs font-medium'>Completed</p>
                    : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
               }
            </div>
          ))
          }
        </div>
      }
        
      </div>

    </div>
  )
}

export default Dashboard

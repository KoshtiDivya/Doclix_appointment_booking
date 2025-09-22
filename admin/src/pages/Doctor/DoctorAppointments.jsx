import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { appointments, dToken, getAppointments , cancelAppointment, completeAppointment} = useContext(DoctorContext)
  
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
    
  useEffect(() => {
    getAppointments();
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border-rounded overflow-y-scroll text-sm max-h-[80vh] min-h-[50vh]'>

        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        
        {
          appointments.reverse().map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base py-3 px-6 sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 border-b hover:bg-grey-50'   key={index}>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex gap-2 items-center'> 
                <img className='w-8 rounded-full' src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-primary py-1 rounded-full px-3'>{ item.payment ? 'Online ' : 'Cash'}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p>{currency} {item.amount}</p>

              {
                item.cancelled
                  ? <p className='text-red-700  font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-800  font-medium'>Completed</p>
                    : <div className='flex gap-1'>
                        <img onClick={()=>cancelAppointment(item._id)} className=' w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                        <img onClick={()=>completeAppointment(item._id)} className=' w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                      </div>
              }
              
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointments

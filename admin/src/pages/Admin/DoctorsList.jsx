import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, getAllDoctors, aToken, changeAvailability } = useContext(AdminContext);
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  },[aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll w-full max-w-6xl'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='flex flex-wrap gap-4 pt-5 gap-y-6 w-full'>
        {
          doctors.map((item, index) => (
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
                <img className='bg-blue-100 group-hover:bg-primary transition-all duration-500'  src={item.image} alt="" />
                <div className='p-4'>
                  <p className='text-neutral-800 font-medium text-lg'>{item.name}</p>
                  <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='flex gap-1 items-center text-sm mt-2'>
                  <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
                </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList

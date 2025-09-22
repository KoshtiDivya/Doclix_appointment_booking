import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext)
  return (
    <div className='flex flex-col items-center justify-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className=' text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
          <div className='grid grid-cols-auto w-full gap-4 pt-5 px-3 pag-y-0 sm:px-0 '>
              {doctors.slice(0, 10).map((doctor, index) => (
                  <div onClick={() => { navigate(`/appointment/${doctor._id}`);  scrollTo(0,0)}} key={index} className=' rounded-xl overflow-hidden cursor-pointer border border-blue-200 hover:translate-y-[-10px] transition-all duration-500 '>
                      <img className='bg-blue-50' src={doctor.image} alt="" />
                      <div className='p-4'>
                          <div className='flex items-center gap-2 text-sm text-center'>
                             <p className={`w-2 h-2 rounded-full ${doctor.available ? "bg-green-700 " : "bg-red-600"}`}></p>
                             <p className={` ${doctor.available ? "text-green-700" : "text-red-700"}`}>{doctor.available ? "Available" : "Not available"}</p>
                           </div>
                          <p className='text-gray-800 text-lg font-medium'>{doctor.name}</p>
                          <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
                      </div>
                  </div>
              ))}
          </div>
          <button onClick={() => { navigate("/doctors");  scrollTo(0,0)}} className='px-12 py-2 bg-blue-50  text-gray-600 rounded-full mt-4'>more</button>
    </div>
  )
}

export default TopDoctors

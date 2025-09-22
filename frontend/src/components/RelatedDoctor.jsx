import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctor = ({ speciality, docId }) => {
    const { doctors } = useContext(AppContext);
    const [relDoc, setRelDoc] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDoc(doctorsData);
            // console.log(doctorsData)
        }
    },[doctors, speciality, docId]);
    
    return (
    <div className='flex flex-col items-center justify-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Related Doctors</h1>
        <p className='text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
          <div className='grid md:grid-cols-5 grid-cols-auto w-full gap-4 pt-5 px-3 p-y-0 sm:px-0 '>
              {relDoc.slice(0, 5).map((doctor, index) => (
                  <div onClick={() => { navigate(`/appointment/${doctor._id}`);  scrollTo(0,0)}} key={index} className=' rounded-xl overflow-hidden cursor-pointer border border-blue-200 hover:translate-y-[-10px] transition-all duration-500 '>
                      <img className='bg-blue-50' src={doctor.image} alt="" />
                      <div className='p-4'>
                         <div className='flex items-center gap-2 text-sm text-center'>
                           <p className={`w-2 h-2 bg-green-400  rounded-full ${doctor.available ? "" : "bg-red-600"}`}></p>
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

export default RelatedDoctor;

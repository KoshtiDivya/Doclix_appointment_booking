import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors, getDoctorsData } = useContext(AppContext);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  
  const applyFilter = () => {
    if(speciality) {
      setFilteredDoctors(doctors.filter(doctor => doctor.speciality === speciality));
    }else{
      setFilteredDoctors(doctors);
    }
  }
  useEffect(() => {
    applyFilter(); //whenever the doctors or speciality changes, reapply the filter
  }, [doctors, speciality]);

  // useEffect(() => {
  //   getDoctorsData();
  //   console.log(doctors)
  // },[speciality])
  
  // If no doctors are available, show a message
  if (filteredDoctors.length === 0) {
    return (
      <div className='text-gray-600'>
        <p>No doctors available for this speciality.</p>
      </div>
    );
  }
  return (
    <div className='text-gray-600'>
      <p>Browse through the doctors specialists.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm ${showFilter ? "flex" : "hidden sm:flex"}`}>
          <p onClick={()=>{ speciality === "General Physician" ? navigate("/doctors") : navigate("/doctors/General Physician")}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded-lg border-gray-300 hover:bg-blue-50 transition-all cursor-pointer ${speciality === "General Physician" ? "bg-indigo-100 text-black" : ""}`}>General Physician</p>
          <p onClick={()=>{ speciality === "Gynecologist" ? navigate("/doctors") : navigate("/doctors/Gynecologist")}}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded-lg border-gray-300 hover:bg-blue-50 transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={()=>{ speciality === "Dermatologist" ? navigate("/doctors") : navigate("/doctors/Dermatologist")}}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded-lg border-gray-300 hover:bg-blue-50 transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={()=>{ speciality === "Pediatricians" ? navigate("/doctors") : navigate("/doctors/Pediatricians")}}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded-lg border-gray-300 hover:bg-blue-50 transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
          <p onClick={()=>{ speciality === "Neurologist" ? navigate("/doctors") : navigate("/doctors/Neurologist")}}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded-lg border-gray-300 hover:bg-blue-50 transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={()=>{ speciality === "Gastroenterologist" ? navigate("/doctors") : navigate("/doctors/Gastroenterologist")}}className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded-lg border-gray-300 hover:bg-blue-50 transition-all cursor-pointer  ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
        </div>
       
        <div className='w-full grid md:grid-cols-2 gap-4 grid-cols-auto lg:grid-cols-4'>
          {
            filteredDoctors.map((doctor, index) => (
                  <div onClick={()=>navigate(`/appointment/${doctor._id}`)} key={index} className=' rounded-xl overflow-hidden cursor-pointer border border-blue-200 hover:translate-y-[-10px] transition-all duration-500 '>
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
              ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors

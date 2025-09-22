import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData ,{ headers: { dtoken: dToken } });
      if(data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    if(dToken) {
      getProfileData();
    }
  }, [dToken])

  return profileData && (
    <div className='w-full max-w-6xl m-5'>


      <div className='flex flex-col m-2.5 gap-4'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-60 rounded-lg' src={profileData.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white max-w-4xl'>
          {/* -----------Doc info -- name, degree, experience */}
          <p className='flex items-center gap-3 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - { profileData.speciality}</p>
            <button className='border border-blue-200 text-xs rounded-full px-2 py-0.5'>{ profileData.experience}</button>
          </div>

          {/* -------Doc about------- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium mt-3 text-neutral-800'>About :</p>
            <p  className='text-sm text-gray-600 max-w-[700px] mt-1'>{ profileData.about}</p>
          </div>

          <p className=' text-gray-600  font-medium mt-4'>Appointment Fee : <span className='text-gray-800'>{currency} { isEdit ? <input type="number"  onChange={(e) => setProfileData(prev => ({...prev, fees : e.target.value}))} value={profileData.fees}/> : profileData.fees}</span></p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? <input className='border outline-none' type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1} <br />
              {isEdit ? <input className='border outline-none' type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2} 
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input onChange={()=> isEdit && setProfileData(prev => ({...prev, available : !prev.available} )) } checked={profileData.available} type="checkbox" name="available" id="" />
            <label htmlFor="available">Available</label>
          </div>
          {
            isEdit
              ? <button onClick={updateProfile} className='border py-1 px-4 border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all duration-200'>Update Details</button>
              : <button onClick={()=>setIsEdit(true)} className='border py-1 px-4 border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all duration-200'>Edit</button>
          }
          
          
        </div>
      </div>



    </div>
  )
}

export default DoctorProfile

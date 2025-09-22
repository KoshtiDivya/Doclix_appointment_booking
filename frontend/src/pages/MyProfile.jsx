import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(false);
  
  const updateUserProfile = async () => {
    try {
      const formData = new FormData();  
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('dob', userData.dob);
      formData.append('gender', userData.gender);

      image && formData.append('image', image);
      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });
      if (data.success) {
        toast.success("Profile updated successfully");
        await loadUserProfileData();
        setEditMode(false);
        setImage(false);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message);
    }
  }
  
  return userData &&  (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {
        editMode ? 
          <label htmlFor="profile-pic">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image } alt="" />
              <img className='w-10 absolute bottom-12 right-12' src={image ? " " : assets.upload_icon } alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='profile-pic' hidden />
          </label>
          :  <img className='rounded w-36 mt-10' src={userData.image} alt="" />
      }
     {
        editMode
          ?<div>
            <input className='border bg-gray-50 text-3xl text-neutral-800 mt-4 outline-none' type='text' value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} />
           </div>
        : <p className='text-3xl font-medium mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p >Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p >Phone : </p>
          {
           editMode
           ?<div>
            <input className='border bg-gray-100 max-w-52' type='text' value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
           </div>
           : <p className='text-blue-500'>{userData.phone}</p>
          } 
          <p >Address :</p>
          {
           editMode
           ?<p>
                <input className='border  bg-gray-50' type='text' value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev,address : {...prev.address, line1: e.target.value} }))} />
                <br />
                <input className='border  bg-gray-50' type='text' value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev,address : {...prev.address, line2: e.target.value} }))} />
            </p>
           : <div className='text-gray-500'><p>{userData.address.line1}</p><p>{userData.address.line2}</p></div>
          } 

        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-5'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p>Gender : </p>
              {
             editMode
              ? <select name="gender" className='max-w-20 bg-gray-100' value={userData.gender} onChange={(e)=> setUserData(prev => ({...prev, gender : e.target.value}))} >
                   <option value="Male">Male</option>
                   <option value="Female">Female</option>
                 </select>
             : <p className='text-gray-500'>{userData.gender}</p>
             }
             <p>Birthday:</p>
             {
               editMode ? 
                 <input className='border max-w-28 bg-gray-100' type="date" value={userData.dob}  onChange={(e)=> setUserData(prev => ({...prev, dob : e.target.value}))}/>
                 : <p className='text-gray-500'>{userData.dob}</p>
               }
         </div>
      </div>
      <div>
        {
          editMode
            ? <button className='px-5 py-3 text-gray-500 border rounded-full border-primary mt-10 hover:bg-black hover:text-white transition-all duration-500' onClick={updateUserProfile}>Save Information</button>
            : <button className='px-5 py-3 text-gray-500 border rounded-full border-primary mt-10 hover:bg-black hover:text-white transition-all duration-500' onClick={()=> setEditMode(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile

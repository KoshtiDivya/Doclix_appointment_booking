import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify'
import axios from 'axios'
 

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
   
  const { aToken, backendUrl } = useContext(AdminContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        return  toast.error("Image not Selected")
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("speciality", speciality);
      formData.append("about", about);
      formData.append("degree", degree);
      formData.append("fees", Number(fees));
      formData.append("experience", experience);
      formData.append("address", JSON.stringify({line1 : address1, line2: address2}));
      // console.log(formData)

      // formData.forEach((data) => {
      //   console.log(data)
      // })

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setAddress1('');
        setAddress2('');
        setEmail('');
        setDegree('');
        setPassword('');
        setExperience('1 Year');
        setAbout('');
        setFees('');
        setSpeciality('General Physician')
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(data.message);
    }

  }

  return (
    <div className='w-full m-5 max-w-6xl'> 
      <form onSubmit={onSubmitHandler}>
        <p className='mb-3 text-lg font-medium'>Add Doctor</p>

        <div className='bg-white border rounded py-8 px-8 max-h-[80vh] w-full max-w-4xl text-sm overflow-y-scroll'>
          <div className='flex items-center gap-4 text-gray-500 mb-8'>
            <label htmlFor="doc-img">
                <img className='w-16 bg-gray-100 cursor-pointer rounded-full' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setDocImg(e.target.files[0])}  type="file" id='doc-img' hidden />
            <p className='text-sm font-medium'>Upload doctor <br /> picture</p>
          </div>
          <div className='flex flex-col lg:flex-row gap-10 items-start text-gray-600'>
            {/* ------------left side-------------------------------- */}
            <div className='flex flex-col lg:flex-1 w-full gap-4'>  
              <div className='flex-1 gap-1 flex-col flex'>
                <p>Doctor name</p>
                <input onChange={(e)=>setName(e.target.value)} value={name} className='border px-3 py-1.5 rounded' type="text" name="" id=""  placeholder='Name' required/>
              </div>
              <div className='flex-1 gap-1 flex-col flex'>
                <p>Doctor Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border px-3 py-1.5 rounded' type="email" name="" id=""  placeholder='Email' required/>
              </div>
              <div className='flex-1 gap-1 flex-col flex'>
                <p>Doctor Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border px-3 py-1.5  rounded' type="password" name="" id=""  placeholder='Password' required/>
              </div>
              <div className='flex-1 gap-1 flex-col flex'>
                <p>Experience</p>
                <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border  px-3 py-1.5  rounded' name="" id="">
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Year</option>
                  <option value="3 Year">3 Year</option>
                  <option value="4 Year">4 Year</option>
                  <option value="5 Year">5 Year</option>
                  <option value="6 Year">6 Year</option>
                  <option value="7 Year">7 Year</option>
                  <option value="8 Year">8 Year</option>
                  <option value="9 Year">9 Year</option>
                  <option value="10+ Year">10+ Year</option>
                </select>
              </div>
              <div className='flex-1 gap-1 flex-col flex'>
                <p>Fees</p>
                <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border px-3 py-1.5  rounded' type="number" name="" id=""  placeholder='Fees' required/>
              </div>
            </div>

            {/* ---------------right side */}
            <div className='flex flex-col lg:flex-1 w-full gap-4'>

               <div className='flex-1 gap-1 flex-col flex'>
                <p>Speciality</p>
                <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border px-3 py-1.5  rounded' name="" id="">
                  <option value="General Physician">General Physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div className='flex-1 gap-1 flex-col flex'>
                <p>Education</p>
                <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border px-3 py-1.5  rounded' type="text" name="" id=""  placeholder='Education' required/>
              </div>
              
              <div className='flex-1 gap-1 flex-col flex'>
                <p>Address</p>
                <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className='border  px-3 py-1.5  rounded' type="text" name="" id="" placeholder='Address 1' required/> 
                <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className='border  px-3 py-1.5  rounded' type="text" name="" id="" placeholder='Address 2' required/>
              </div>
            </div>
          </div>
          <div className='my-5 text-gray-600 text-sm'>
            <p>About Doctor</p> 
            <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='border  px-4 pt-2 w-full mt-2 rounded' rows={5}  name="" id="" placeholder='write about Doctor'></textarea>
          </div>

          <button type='submit' className='px-10 py-3 rounded-full bg-primary text-white hover:bg-blue-950'>Add doctor</button>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor

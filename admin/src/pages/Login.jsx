import React, { useContext } from 'react'
import {assets } from '../assets/assets'
import { useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import {  toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext);

  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
        event.preventDefault()
      try {
          
          if (state === "Admin") {
            
            const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password})
            if(data.success == true){
              localStorage.setItem('aToken', data.token);
              setAToken(data.token)
              toast.success("Login Successfully.")
              document.title = "Doclix Admin Panel"
              navigate('/admin-dashboard')
            } else {
               toast.error(data.message)
            }
          } else {
             
            const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });

            if(data.success == true){
              localStorage.setItem('dToken', data.token);
              setDToken(data.token)
              toast.success("Login Successfully.")
              document.title = "Doclix Doctor Panel"
              navigate('/doctor-dashboard')
            } else {
               toast.error(data.message)
            }
          }
      
        } catch (error) {
            toast.error(error.message)
        }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col items-start gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{ state } </span> Login </p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className='outline-none border border-[#DADADA] p-2 rounded mt-1 w-full' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password}  className='outline-none border border-[#DADADA] p-2 rounded mt-1 w-full' type="password" required />
        </div>
        <button className='w-full bg-primary text-white text-base  mt-1 rounded-md p-2 hover:bg-green-500'>Login</button>
        {
          state === 'Admin'
            ? <p>Doctor Login? <span className='cursor-pointer text-primary underline ' onClick={()=>setState('Doctor')}>Click here..</span></p>
            : <p>Admin Login? <span className='cursor-pointer text-primary underline ' onClick={()=>setState('Admin')}>Click here..</span></p>
        }
      </div>

    </form>
  )
}

export default Login

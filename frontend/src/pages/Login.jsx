import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();;
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (event) =>{
    event.preventDefault();
    try {

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (data.success) {
          toast.success("Account created successfully");
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
      
      else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (data.success) {
          toast.success("Login successful");
          localStorage.setItem("token", data.token);
          setToken(data.token);
      
        } else {
          toast.error(data.message);
        }
      }
    }
    
    catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(token) {
      navigate("/")
     }
  },[token])
  return (
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center' >
      <div className='flex flex-col gap-3 m-auto p-8 items-start min-w-[320px] sm:min-w-96 border rounded-xl text-zinc-700 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign Up" ? "sign up" : "login"} to book appointment</p>

        {state === "Sign Up" ? 
         <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1 outline-none' type="text" onChange={(e) =>setName(e.target.value)} value={name}  />
        </div> : "" }
        
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1 outline-none' type="email" onChange={(e) =>setEmail(e.target.value) } value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1 outline-none' type="password" onChange={(e) =>setPassword(e.target.value) } value={password} />
        </div>
        <button className='px-5 py-2 bg-primary text-white w-full rounded' type='submit'>{state === "Sign Up" ? "Create Account" : "Login"}</button>
        {
          state === "Sign Up" ? 
          <p className='text-sm'>Already have an account? <span className='text-primary cursor-pointer underline' onClick={() => setState("Login")}>Login here</span></p> : 
          <p className='text-sm'>Don't have an account? <span className='text-primary cursor-pointer underline' onClick={() => setState("Sign Up")}>Sign Up</span></p>
        }
      </div>
      
    </form>
  )
}

export default Login

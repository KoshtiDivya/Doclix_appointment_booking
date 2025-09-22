import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* ---left section--- */}
        <div>
                  {/* <img className='w-40 h-12.5 mb-5 mx-[-10px]' src={assets.logo} alt="" />  */}
                  <img className="w-40 h-12.2" src={assets.logo} alt="" />
                  <p className='w-full text-gray-600 md:w-2/3 leading-6'>Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
              
        {/* ---center section--- */}
        <div>
                  <p className='text-xl font-medium mb-5 text-gray-700'>COMPANY</p> 
                  <ul className='flex flex-col gap-2 text-gray-600 mt-5'>
                      <li>Home</li>
                      <li>About us</li>
                      <li>Contact us</li>
                      <li>Privacy policy</li>
                  </ul>
        </div>
              
        {/* ---right section--- */}
        <div>
                  <p className='text-xl font-medium mb-5  text-gray-700'>GET IN TOUCH</p>
                  <ul className='flex flex-col gap-2 text-gray-600 mt-5'>
                      <li>+1-212-456-7890</li>
                      <li>doclixinfo@gmail.com</li>
                  </ul>
        </div>
           
          </div>
          {/* ----copyright text---- */}
       <div>
              <hr />
              <p className='py-5 text-sm text-center'>Copyright © 2024 Doclix - All Right Reserved</p>
       </div>
    </div>
   
  )
}

export default Footer

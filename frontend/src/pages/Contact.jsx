import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-gray-500 text-xl pt-10 mb-10">
        <p>
          CONTACT <span className="font-semibold text-gray-800">US</span>
        </p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-10 mb-28 justify-center'>
        <img className="w-full md:max-w-[360px]" src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6 text-sm text-gray-500'>
          <p className='font-bold text-lg '>OUR OFFICE</p>
          <p >54709 Willms Station <br /> Suite 350, Ahmedabad, Gujarat</p>        
          <p>Tel: (415) 555‑0132 <br /> Email: doclixinfo@gmail.com</p>
          <p className='font-bold text-lg'>CAREERS AT DOCLIX</p>
          <p>Learn more about our teams and job openings.</p>
          <button className='px-5 py-3 border border-gray-600 hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact

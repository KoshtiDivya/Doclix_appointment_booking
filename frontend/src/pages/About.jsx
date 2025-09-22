import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-gray-500 text-2xl pt-10">
        <p>
          ABOUT <span className="font-medium text-gray-800">US</span>
        </p>
      </div>
      
        <div className="my-10 flex flex-col md:flex-row gap-12">
          <img className="w-full md:max-w-[360px]" src={assets.about_image} alt="" />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
            <p>Welcome to Doclix, your trusted partner in managing your healthcare needs conveniently and efficiently. At Doclix, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
            <p>Doclix is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Doclix is here to support you every step of the way.</p>
            <b className="text-gray-800">Our Vision</b>
            <p>Our vision at Doclix is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
         </div>
      </div>
      <div className=" text-gray-500 text-xl pt-10 mb-10">
        <p>
          WHY <span className="font-semibold text-gray-800">CHOOSE US</span>
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row mb-20 justify-center items-center text-sm">
        <div className="px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 border border-gray-300 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-gray-600">
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>

         <div className="px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 border border-gray-300 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-gray-600">
          <b>CONVENIENCE:</b>
          <p>Easily access to a network of  Trusted healthcare professionals in your area.</p>
        </div>

         <div className="px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 border border-gray-300 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer text-gray-600">
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;

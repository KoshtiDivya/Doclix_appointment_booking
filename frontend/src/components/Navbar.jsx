import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";
const Navbar = () => {

  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logOut = () => {
    setToken(false);
    localStorage.removeItem("token");
  }

  return (
    <div className = "flex justify-between items-center txt-sm py-3 border-b-2 mb-5 border-gray-300 ">
      <img onClick={() => {navigate("/"); scrollTo(0,0)}} className="w-40 h-12.2 cursor-pointer" src={assets.logo} alt="" />
      <ul className="hidden md:flex gap-5 item-start font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden  "/>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden"/>
        </NavLink> 
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden "/>
        </NavLink>
      </ul>
      <div className="flex gap-5 items-center">
        {
          token && userData?
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img className="w-10 rounded-full" src={userData.image} alt=""/>
              <img className="w-2.5" src={assets.dropdown_icon} alt="" />
              <div className="absolute top-0 right-0 pt-20 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p onClick={()=> navigate("/my-profile")} className="hover:text-black cursor-pointer">My Profile</p>
                  <p onClick={()=> navigate("/my-appointments")} className="hover:text-black cursor-pointer">My Appointment</p>
                  <p onClick={logOut} className="hover:text-black cursor-pointer">Logout</p>
                </div>
              </div>
          </div>
            : <button onClick={() => navigate("/login")} className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block" >Create Account</button>
        }
        <img onClick={() => setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />
        {/* -----------------mobile menu-------------------------- */}
        <div className={`${showMenu? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className="flex items-center justify-between px-5 py-6 border-b-2 border-gray-300">
            <img className="w-[120px]" src={assets.logo} alt="" />
            <img className="w-7" src={assets.cross_icon} onClick={()=>setShowMenu(false)} alt="" />
          </div>
          <ul className="flex flex-col ml-10 gap-5 mt-5 text-lg font-medium">
            <NavLink onClick={()=>setShowMenu(false)} to="/"><p className="px-4 py-2 inline-block w-[80%]">HOME</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to="/doctors"><p className="px-4 py-2 inline-block w-[80%]">ALL DOCTORS</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to="/about"><p className="px-4 py-2 inline-block w-[80%]">ABOUT</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to="/contact"><p className="px-4 py-2 inline-block w-[80%]">CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

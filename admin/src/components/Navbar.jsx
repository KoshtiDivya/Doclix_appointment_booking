import react, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext';
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext';
const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext);
    const { dToken, setDToken } = useContext(DoctorContext)
    const navigate = useNavigate();

    const logOut = () => {
        navigate("/");
        aToken && setAToken("");
        aToken && localStorage.removeItem('aToken');

        dToken && setDToken("");
        dToken && localStorage.removeItem('dToken');
    
    }
    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-300 bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img onClick={()=>navigate("/")} className='w-[120px] h-14 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='py-1 px-4 rounded-full border border-primary text-gray-600'>{aToken ? "Admin" : "Doctor"}</p>
            </div>
            <button onClick={logOut} className='py-2 px-4 rounded-full bg-primary text-white text-sm hover:bg-red-700'>Logout</button>
        </div>
    )
}
export default Navbar
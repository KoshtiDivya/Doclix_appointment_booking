import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer } from 'react-toastify'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointment from './pages/Admin/AllAppointment'
import DoctorsList from './pages/Admin/DoctorsList'
import AddDoctor from './pages/Admin/AddDoctor'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/doctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken?  (
    <div className='bg-[#F8F9D]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start bg-[#F2F3FF]'>
        <Sidebar />
        {/*----------------Admin routes----------------- */}
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/> }/>
          <Route path='/all-appointments' element={<AllAppointment/> }/>
          <Route path='/doctors-list' element={<DoctorsList/> }/>
          <Route path='/add-doctor' element={<AddDoctor/> }/>
       
        {/* ---------------Doctor routes--------------- */}
        
          <Route path='/doctor-dashboard' element={<DoctorDashboard/> }/>
          <Route path='/doctor-appointments' element={<DoctorAppointments/> }/>
          <Route path='/doctor-profile' element={<DoctorProfile/> }/>
        </Routes>
      </div>
    </div>
  ) : (
      <>
        <Login />
        <ToastContainer />
      </>
  )
}

export default App

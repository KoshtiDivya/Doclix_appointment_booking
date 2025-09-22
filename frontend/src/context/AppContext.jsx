import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '$' // Define the currency symbol here or fetch it from a config";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [userData, setUserData] = useState(false);


    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            // console.log("Doctors data fetched successfully:", data.doctors);
            if(data.success){
                setDoctors(data.doctors)
                // console.log(data.doctors)
            } else {
               toast.error(data.message)
            }
        } catch (error) {
            console.error("Error fetching doctors data:", error);
            toast.error(error.message)
        } 
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });
            if(data.success){
               setUserData(data.userData)
            } else {
               toast.error(data.message)
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error(error.message)
        }
       
    }

    useEffect(() => {
        getDoctorsData();
    }, [])
    
    useEffect(() => {
        if(token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    },[token])
    
    const value = {
        doctors,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData,
        getDoctorsData,
        setUserData,
        loadUserProfileData
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctor from "../components/RelatedDoctor";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, getDoctorsData, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [slotIndex, setSlotIndex] = useState(0);
  const [docSlots, setDocSlots] = useState([]);
  const [slotTime, setSlotTime] = useState("");

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };
  const getAvailableSlots = () => {
    setDocSlots([]);
    //getting current date
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting the slots for next 7 days
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting the slot time
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formatedTime = currentDate.toLocaleTimeString([],{
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day + "_" + month + "_" + year; 
        const slotTime = formatedTime
        //checking if the slot is available
        if (!docInfo || !docInfo.slots_booked) {
          return;
        }
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {
          timeSlots.push({
          datetime: new Date(currentDate),
          time: formatedTime,

           });
        }
        //add slot to the timeSlots array
        
 
        //incrementing the time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      } 
      //adding the timeSlots to the docSlots array
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
      if (!token) {
          toast.warn("Please login to book an appointment");
          return navigate('/login');
        }
      try {
        const date = docSlots[slotIndex][0].datetime;

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        const slotDate = day + "_" + month + "_" + year;
      
        const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } });
        if (data.success) {
          toast.success(data.message);
          getDoctorsData();
          navigate('/my-appointments')
        }else{
          toast.error(data.message);
        }
      
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }

  useEffect(() => {
    //  console.log("docSlots", docSlots);
  }, [docSlots]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return (
    docInfo && (
      <div>
        {/* --------doctor section----------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>
          {/* ---------------docInfo------------------------------------*/}
          <div className="flex1 border rounded-lg border-gray-400 p-8 bg-white sm:mt-0 w-full">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="border border-gray-600 rounded-full px-2 text-xs py-0.5">
                {docInfo.experience}
              </button>
            </div>

            {/* ------------doc-about--------------- */}
            <p className="flex items-center gap-1 text-sm mt-3 font-medium mb-1 text-gray-900">
              About
              <img className="w-2.6" src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
            <p className="text-sm text-gray-500 mt-5">
              Appointment fee:{" "}
              <span className="text-black font-medium">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {/*-----------------------Booking slots------------------ */}
        <div className="sm:ml-72 mt-4 sm:pl-4 text-gray-700 font-medium">
          <p>Booking slots</p>
          <div className="flex items-center gap-3 overflow-x-scroll mt-4 w-full">
            {docSlots.length &&
              docSlots.map((slots, index) => (
                <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white" : "border border-gray-400 bg-white"}`}>
                  <p>{slots[0] && daysOfWeek[slots[0].datetime.getDay()]}</p>
                  <p>{slots[0] && slots[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {
              docSlots.length && docSlots[slotIndex].map((item,index) =>(
                <p onClick={()=>setSlotTime(item.time)} key={index} className={`text-sm cursor-pointer font-light flex-shrink-0 px-5 py-2 rounded-full ${item.time === slotTime ? "bg-primary text-white" : "bg-white border border-gray-400 "}`}>
                  {item.time.toUpperCase()}
                </p>
              ))
            }
          </div>
          <button onClick={bookAppointment} className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an appointment</button>
        </div>
        {/* --------------------------Related Doctor--------------------- */}
        <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import { assets } from '../assets/assets.js'
import RelatedDoctors from '../components/RelatedDoctors.jsx'

const Appointment = () => {

  const {docId}= useParams()
  const {doctors, currencySymbol}= useContext(AppContext)
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState(' ')

  const fetchDocInfo = async ()=> {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  
  }
 
const getAvailableSlots = async ()=>{
  setDocSlots([])
  //getting current date
  
  let today= new Date()
  for (let i = 0; i < 7; i++){
    //getting data with index
    let currentDate = new Date(today)
       currentDate.setDate(today.getDate()+i)

       //setting end time of the date with index
    let endTime = new Date()
    endTime.setDate(today.getDate()+i)
    endTime.setHours(21, 0, 0, 0)

    //setting hours
    if(today.getDate()===currentDate.getDate()){
      currentDate.setHours(currentDate.getHours()>10? currentDate.getHours()+1:10)
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
    }
    else{
      currentDate.setHours(10)
      currentDate.setMinutes(0)
    }
    let timeSlots = []
    while(currentDate<endTime){
      let formattedTime = currentDate.toLocaleTimeString([], {hour: "2-digit", minute: '2-digit'})

      // add slot to array
      timeSlots.push({
        dateTime: new Date(currentDate),
        time: formattedTime
      })
      // Increment current time by 30 minutes
      currentDate.setMinutes(currentDate.getMinutes() + 30)
    }

    setDocSlots(prev =>([...prev, timeSlots]))
  }
  
}



  useEffect(()=>{
    fetchDocInfo()
  },[doctors, docId])

  useEffect(()=>{
    getAvailableSlots()
  }, [docInfo])

  useEffect(()=>{
    console.log(docSlots);
  },[docSlots])


  return  docInfo && (
    <div>
      {/*--------------Doctor Details---------------*/}
      <div className='flex flex-col sm:flex-row gap-4'>
         <div>
           <img className='bg-blue-500 w-full sm:max-w-72 rounded-lg' src={docInfo.image}/>
         </div>
         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm: mx-0 mt-[-80px] sm:mt-0'>
            {/*--------------Doctor Info---------------*/}
            <p className='flex items-center gap-2 text-center font-medium text-gray-900'>{docInfo.name} 
              <img className='w-5' src={assets.Vector}/>
            </p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-900'>
              <p>{docInfo.degree}-{docInfo.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
            </div>
            {/*--------------About section---------------*/}
         <div>
          <p className='flex items-center gap-1 text-sm font-medium text-gray-900'>
            About <img src={assets.infoIcon}/>
          </p>
          <p className='text-sm text-gray-900 max-w-[700] mt-1'>{docInfo.about}</p>
         </div>
         <p className='text-gray-500 font-medium mt-4'>Appointment fee: 
          <span className=' text-gray-600'>{currencySymbol}{docInfo.fees}</span>
         </p>
         </div>
         
      </div>


      {/*--------------Booking Slots section---------------*/}
      <div className='sm: ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={()=> setSlotIndex(index)} className={`text-center  py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-sky-500 text-white': 'border border-gray-400'}`} key={index}>
              <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
              <p>{item[0] && item[0].dateTime.getDate()}</p>
            </div>
            ))
          }
        </div>
        <div className=' flex item-center gap-3 w-full overflow-x-scroll mt-4'>
        {docSlots.length && docSlots[slotIndex].map((item, index)=>(
            <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-sky-500 text-white': 'text-gray-500 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
        ))}
        </div>
        <button className=' bg-sky-500 text-white text-sm font-light px-14 py-3 rounded-full mt-4'>Book an appointment</button>

      </div>
      {/*------Listing Related Doctors-----*/}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment

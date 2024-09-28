import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';

export default function CalenderView() {

  const [value, onChange] = useState(new Date());

    const [allEvents, setAllEvents]=useState()
    useEffect(()=>{
        axios.get('http://localhost:4000/get-all-events').then((response)=>{
            setAllEvents(response.data)
        })
    },[])
  return (
    <div className=''>
        <div className="felc w-full h-auto flex flex-col gap-10 text-start ">
            <div className='text-5xl text-gray-800 ml-8'>Currents Events</div>
            <div className="calende">
            <Calendar  value={value} />
            </div>
        </div>
    </div>
  )
}

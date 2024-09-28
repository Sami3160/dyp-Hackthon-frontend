import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import Calendar from 'react-calendar';
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./CSS/custom-date-range.css"; // your custom css file
export default function CalenderView() {
  const [events,setEvents]=useState();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:4000/get-all-events').then((response) => {
      setEvents(response);
      console.log(response.data);
    });
  }, []);
  const [date, setDate] = useState(new Date());

    const [allEvents, setAllEvents]=useState()
    useEffect(()=>{
        axios.get('http://localhost:4000/get-all-events').then((response)=>{
            setAllEvents(response.data)
        })
    },[])
  return (
    <div className='min-h-screen'>
      <div className="flex flex-col w-full h-auto gap-10 text-center ite felc ">
        <div className='ml-8 text-5xl text-gray-800'>Currents Events</div>
        <div className="flex flex-col justify-center w-1/2 h-1/2 items-end">
        <button className="w-40 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 my-2" onClick={(e)=>{
          e.preventDefault()
          setIsOpen(true)
        }}>Add New Event</button>
          <DateRange
                editableDateInputs={false}
                months={1}
                direction="horizontal"
                minDate={new Date()}
                maxDate={
                  new Date(new Date().setDate(new Date().getDate() + 30))
                } // disable dates more than 30 days from now
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={[new Date(),new Date()]}
              />
        </div>
      </div>
    </div>
  )
}

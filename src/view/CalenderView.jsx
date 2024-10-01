import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import Calendar from 'react-calendar';
import OfflineEntryModal from './OfflineEntryModal'
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./CSS/custom-date-range.css"; // your custom css file
import ResponsiveAppBar from './ResponsiveAppBar'
import Footer from './Footer'

export default function CalenderView() {
  const [isOpen, setIsOpen] = useState(false);

  const [date, setDate] = useState(new Date());
  const [checked, setChecked] = useState(false);


  const [events, setAllEvents] = useState()
  useEffect(() => {
    axios.get('http://localhost:4000/get-all-events').then((response) => {
      setAllEvents(response.data)
    })
  }, [])
  if (events == null) {
    return <h1>Loading...</h1>
  }
  return (
    <div className='min-h-screen'>
      <ResponsiveAppBar />
      <OfflineEntryModal onRequestClose={() => setIsOpen(false)} isOpen={isOpen} />
      <div className=''>
        <div className="flex flex-col w-full h-auto gap-10 text-center ite felc ">
          <div className='ml-8 text-5xl text-gray-800 pt-4'>Currents Events</div>
          {
            localStorage.getItem('token')?.length > 0 && (
              <div className='flex justify-end px-4'>
                <button className="w-40 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 my-2" onClick={(e) => {
                  e.preventDefault()
                  setIsOpen(true)
                }}>Add New Event</button>
              </div>
            )
          }



        </div>

        <div className="w-fit border border-black">
          <table className="divide-y divide-gray-200 text-xl">
            <thead className=" ">
              <tr className="font-bold border-b-2 px-2 text-left">
                <th className="py-3 px-4 text-xl font-bold tracking-wider text-left ">
                  ID
                </th>
                <th className="py-3 px-4 text-xl font-bold tracking-wider text-left  ">
                  Event Name
                </th>
                <th className="py-3 px-4 text-xl font-bold tracking-wider text-left  ">
                  Designation
                </th>
                <th className="py-3 px-4 text-xl font-bold tracking-wider text-left  ">
                  Department
                </th>
                <th className="py-3 px-4 text-xl font-bold tracking-wider text-left  ">
                  Phone
                </th>
                <th className="py-3 px-4 text-xl font-bold tracking-wider text-left  ">
                  Details
                </th>
                <th className="py-3 px-4 text-xl font-bold tracking-wider text-left  ">
                  Hall Date
                </th>
                <th className="py-3 px-4 text-xl font-bold tracking-wider text-left  ">
                  Start time
                </th>
                <th className="py-3 px-4 text-xl font-bold tracking-wider text-left  ">
                  End Time
                </th>
                <th className="py-3 px-4 text-xl font-bold tracking-wider text-left  ">
                  Coordinatot
                </th>
                <th className="py-3 px-4 text-xl font-bold tracking-wider text-left  ">
                  Guest
                </th>
                <th className="py-3 px-4 text-xl font-bold tracking-wider text-left  ">
                  No. Of Guests
                </th>
                <th className="py-3 px-4 text-xl font-bold tracking-wider text-left  ">
                  Attendes Number
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 ">
              {events.map((item, index) => {
                return (
                  <tr key={index} className="hover:bg-gray-100 ">
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.id}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.title}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.designation}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.department}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.phone}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.details}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.halldate}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.timefrom}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.timeto}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.coordinatorname}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.guestname}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.numberofguests}
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item.numberofattendents}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className='mt-40'>
        <Footer />
      </div>
    </div>
  )
}

import { useEffect, useState } from "react";
import axios from 'axios'
import Footer from './Footer';
import ResponsiveAppBar from "./ResponsiveAppBar";

export const Dashboard = () => {
   const [events, setEvents] = useState(null);
   const [checked, setChecked] = useState(false);
   const [checkedNum, setCheckedNum] = useState([]);
   const [Loading, setLoading] = useState(false);
   const [rejesting, setRejecting] = useState(false);

   useEffect(()=>{
      document.title = "Manage all events here"
   },[])
   const getAllEvents = () => {
      axios.get('http://localhost:4000/get-all-events').then((response) => {
         setEvents(response.data);
         console.log(response.data);
      });
   }

   useEffect(() => {
      getAllEvents();
   }, []);


   if (events == null) {
      return <h1>Loading...</h1>
   }
   return (
      <div className="flex flex-col min-h-screen justify-between overflow-x-auto">
         <div className="">
            <ResponsiveAppBar />
            <div className="flex justify-between px-4 py-2">
               <p className="h-auto font-semibold text-lg">Approved Events</p>
               {
                  checked ? <div className="flex gap-2"><button onClick={() => {
                     setLoading(true);
                     axios.post('http://localhost:4000/approve-event', { checkedNum }).then((response) => {
                        console.log(response.data);
                        setLoading(false);
                        alert("Approved Successfully")
                        getAllEvents();

                        const approvedUsers = events.filter(item => checkedNum.includes(item.id));
                        approvedUsers.forEach(user => {
                           axios.post('http://localhost:4000/send-text-message', { phoneNumber: user.phone, message: 'Your request has been approved!' })
                              .then((response) => {
                                 console.log(response.data);
                              })
                              .catch((error) => {
                                 console.error(error);
                              });
                        });

                     })
                  }} className="w-40 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 my-2">{Loading ? "Approve..." : "Approve"}</button>
                     <button onClick={() => {
                        setRejecting(true);
                        axios.post('http://localhost:4000/reject-event', { checkedNum }).then((response) => {
                           console.log(response.data);
                           setRejecting(false);
                           alert("Rejected Successfully")
                           getAllEvents();

                           const rejectedUsers = events.filter(item => checkedNum.includes(item.id));
                           rejectedUsers.forEach(user => {
                              axios.post('http://localhost:4000/send-text-message', { phoneNumber: user.phone, message: 'Your request has been rejected!' })
                                 .then((response) => {
                                    console.log(response.data);
                                 })
                                 .catch((error) => {
                                    console.error(error);
                                 });
                           });
                        })
                     }} className="w-40 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-blue-700 my-2">{rejesting ? "Rejecting.." : "Reject"}</button></div> : <div></div>
               }
            </div>


            <div className=" w-[99%] border mt-4 overflow-scroll">
               <table className="divide-y divide-gray-200 text-xl overflow-scroll">
                  <thead className=" ">
                     <tr className="font-bold border-b-2 px-2 text-left">
                        <th className="p-2">

                        </th>
                        <th className="py-3 text-xl font-bold tracking-wider text-left ">
                           ID
                        </th>
                        <th className="py-3 text-xl font-bold tracking-wider text-left  ">
                           Event Name
                        </th>
                        <th className="py-3 text-xl font-bold tracking-wider text-left  ">
                           Designation
                        </th>
                        <th className="py-3 text-xl font-bold tracking-wider text-left  ">
                           Department
                        </th>
                        <th className="py-3 text-xl font-bold tracking-wider text-left  ">
                           Phone
                        </th>
                        <th className="py-3  text-xl font-bold tracking-wider text-left  ">
                           Details
                        </th>
                        <th className="py-3  text-xl font-bold tracking-wider text-left  ">
                           Hall Date
                        </th>
                        <th className="py-3 text-xl font-bold tracking-wider text-left  ">
                           Start time
                        </th>
                        <th className="py-3  text-xl font-bold tracking-wider text-left  ">
                           End Time
                        </th>
                        <th className="py-3  text-xl font-bold tracking-wider text-left  ">
                           Coordinatot
                        </th>
                        <th className="py-3  text-xl font-bold tracking-wider text-left  ">
                           Guest
                        </th>
                        <th className="py-3 text-xl font-bold tracking-wider text-left  ">
                           Attendes Number
                        </th>
                        <th className="py-3 text-xl font-bold tracking-wider text-left  ">
                           Approved
                        </th>
                     </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 ">
                     {events.map((item, index) => {
                        return (
                           <tr key={index} className="hover:bg-gray-100 ">
                              <td className="p-4 w-4">
                                 <div className="flex items-center">
                                    <input
                                       onClick={() => {
                                          setChecked(!checked)
                                          setCheckedNum([...checkedNum, item.id])
                                       }}
                                       id={`checkbox-${item.id}`} // Ensure each checkbox has a unique ID
                                       type="checkbox"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
                                       onChange={() => {

                                          // console.log(checkedData); // Ensure checkedData state is updated
                                       }}
                                    />
                                    <label htmlFor="checkbox-table-1" className="sr-only">
                                       checkbox
                                    </label>
                                 </div>
                              </td>
                              <td className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap ">
                                 {item.id}
                              </td>
                              <td className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap ">
                                 {item.title}
                              </td>
                              <td className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap ">
                                 {item.designation}
                              </td>
                              <td className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap ">
                                 {item.department}
                              </td>
                              <td className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap ">
                                 {item.phone}
                              </td>
                              <td className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap ">
                                 {item.details}
                              </td>
                              <td className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap ">
                                 {item.halldate}
                              </td>
                              <td className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap ">
                                 {item.timefrom}
                              </td>
                              <td className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap ">
                                 {item.timeto}
                              </td>
                              <td className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap ">
                                 {item.coordinatorname}
                              </td>
                              <td className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap ">
                                 {item.guestname}
                              </td>
                              <td className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap ">
                                 {item.numberofattendents}
                              </td>
                              <td className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap ">
                                 {item.numberofguests}
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         </div>

         <Footer />

      </div>
   )
}
export default Dashboard

export const Dashboard = () => {
   return (
      <div>
         <p className="h-auto">Approved Events</p>
         <table className="h-auto w-1/2 rounded-md bg-emerald-500">
            <thead className="p-4">
               <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                  <th>Status</th>
               </tr>
            </thead>
            <tbody className="p-4">
               <tr>
                  <td>Event 1</td>
                  <td>2022-01-01</td>
                  <td>Approved</td>
               </tr>
               <tr>
                  <td>Event 2</td>
                  <td>2022-02-01</td>
                  <td>Approved</td>
               </tr>
               <tr>
                  <td>Event 3</td>
                  <td>2022-03-01</td>
                  <td>Rejected</td>
               </tr>
            </tbody>
         </table>
         <p>Rejected Events</p>
         <div></div>
      </div>
   )
}
export default Dashboard

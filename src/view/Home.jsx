import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className=" w-full ">
        <div className=" w-[100vw]  flex flex-col text-center items-center justify-center gap-7">

          <div className="text-6xl  w-full h-auto ">
            Your Workflow amplified
          </div>

          <div className="text-xl h-auto w-[30vw] text-gray-600 ">
            Make seminar booking simple and easy by Manage webapp,
            Avoide tedious waok papers tasks and try SupManage
          </div>

          <div className="text-xl h-auto w-[20vw] gap-3 text-gray-600 flex ">
          <StartButton/>
          </div>

        </div>
      </div>

    </div>
  )
}


const StartButton = () => {
  const navigate=useNavigate()
  const {auth, login}=useAuth();
  const handleClick=()=>{
    console.log(localStorage.getItem('token'))
    // alert("hello")
    if(!(auth?.token) || localStorage.getItem('token')){
    
      // alert("hello")
      navigate('/login')
    }
    // alert("hello")
  }
  return <div>

    <button
      className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
      onClick={()=>handleClick()}
    >
      <span
        className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
      >
        <span
          className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
        ></span>
      </span>
      <span
        className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
      >
        <span
          className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
        ></span>
      </span>
      <span
        className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
      ></span>
      <span
        className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
      >Get Started
      </span>
    </button>
  </div>



}
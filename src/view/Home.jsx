import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/Auth'
import Footer from './Footer'
import ResponsiveAppBar from './ResponsiveAppBar'
import { useEffect } from 'react'
export default function Home() {
  useEffect(()=>{
    document.title = "Welcome to WebManage"
 },[])
  return (
    <div>
      <ResponsiveAppBar/>
      <div className=" w-full ">
        <div className=" w-[100vw] h-[50vh] mt-10 flex flex-col text-center items-center justify-center gap-7">

          <div className="text-6xl  w-full h-auto ">
            Your Workflow amplified
          </div>

          <div className="text-xl h-auto w-[30vw] text-gray-600 ">
            Make seminar booking simple and easy by Manage webapp,
            Avoide tedious waok papers tasks and try SupManage
          </div>

          <div className="text-xl h-auto  gap-3 text-gray-600 flex mt-20">
            <StartButton />
          </div>

        </div>
      </div>
      <div className="relative mt-20">
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fget.pxhere.com%2Fphoto%2Fauditorium-meeting-audience-theatre-conference-convention-seminar-convention-center-function-hall-academic-conference-conference-hall-614716.jpg&f=1&nofb=1&ipt=0a5efc81a798e27b456a3c5855f069df3d65de7bf57f8dac345625dcdb0f6b4e&ipo=images"
          className='w-full h-[80vh] object-cover filter blur-sm'
          alt="" srcSet="" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-6xl text-white font-bold">Manage Seminar</div>
          <div className="text-2xl text-white font-bold">Make seminar booking simple and easy by Manage webapp</div>
          <div className="text-2xl text-white font-bold">Avoide tedious waok papers tasks and try SupManage</div>
          <div className="text-2xl text-white font-bold">Get Started</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 p-10">
        <Card text="Manage Seminar is a webapp that helps you manage your seminar booking and scheduling. It is a simple and easy-to-use tool that allows you to create, edit, and delete seminar bookings with ease." />
        <Card text="Manage Seminar is a webapp that helps you manage your seminar booking and scheduling. It is a simple and easy-to-use tool that allows you to create, edit, and delete seminar bookings with ease." />
        <Card text="Manage Seminar is a webapp that helps you manage your seminar booking and scheduling. It is a simple and easy-to-use tool that allows you to create, edit, and delete seminar bookings with ease." />
        <Card text="Manage Seminar is a webapp that helps you manage your seminar booking and scheduling. It is a simple and easy-to-use tool that allows you to create, edit, and delete seminar bookings with ease." />

      </div>


      <Footer/>
    </div>
  )
}


const Card = ({ text }) => {
  return <article
    className="col-span-1  w-72 bg-gray-700 shadow-lg p-4 space-y-2 rounded-md hover:-translate-y-2 duration-300"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-10 h-10 text-gray-300 bg-gray-600 rounded-full p-1"
    >
      <path
        d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke="currentColor"
      ></path>
    </svg>
    <p className="text-sm w-full text-gray-400">
      {text}
    </p>
  </article>

}

const StartButton = () => {
  const navigate = useNavigate()
  const { auth, login } = useAuth();
  const handleClick = () => {
    console.log(localStorage.getItem('token'))
    // alert("hello")
     if ( localStorage.getItem('token')?.length > 0) {

    //   // alert("hello")
    navigate('/dashboard')
    return;
  }
  navigate('/login')
    // alert("hello")
  }
  return <div>

    <button
      className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
      onClick={() => handleClick()}
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
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navbar from './components/Navbar.jsx'
import AuthProvider from './contexts/Auth.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './view/Home.jsx'
import Login from './view/Login.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },{
    path: "/home",
    element: <Home/>,
  },{
    path: "/login",
    element: <Login/>,
  }
  
  ,{
    path:"*",
    element:<h1>404 :Wrong path!</h1>
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <AuthProvider>

    <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

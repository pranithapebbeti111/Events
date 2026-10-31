import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Events from './pages/Events'
import EventdetailsPage from './pages/EventdetailsPage'
import './App.css'
import Home from './pages/home'
import Register from './pages/Register'
import Login from './pages/Login'
import MyEvents from './pages/MyEvents'
import { AuthProvider } from "./context/AuthContext"
import BackendTest from "./pages/BackendTest"
import Dashboard from "./pages/DashBoard"
import AdminDashboard from "./pages/AdminDashboard"
function App() {
  
  return (
    <>
    <AuthProvider>
  <BrowserRouter>
  <div>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/events" element={<Events/>}/>
      <Route path="/events/:id" element={<EventdetailsPage/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/my-events" element={<MyEvents />} />
      <Route path="/backend-test" element={<BackendTest />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  </div>
  </BrowserRouter>  
  </AuthProvider>    
  </>   
  )
}

export default App

import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Events from './pages/Events'
import EventdetailsPage from './pages/EventdetailsPage'
import './App.css'
import Home from './pages/home'
import Register from './pages/Register'
import Login from './pages/login'
import MyEvents from './pages/MyEvents'
import { AuthProvider } from "./context/AuthContext"
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
    </Routes>
  </div>
  </BrowserRouter>  
  </AuthProvider>    
  </>   
  )
}

export default App

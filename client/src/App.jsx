import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Events from './pages/Events'
import './App.css'

function App() {
  
  return (
    <>
  <BrowserRouter>
  <div>
    <Navbar/>
    
    <Events/>
  </div>
  </BrowserRouter>      
  </>   
  )
}

export default App

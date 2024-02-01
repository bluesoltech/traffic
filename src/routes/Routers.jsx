import React from 'react'
import Home from '../pages/Home'
import Terms from '../pages/Terms'
import { Routes, Route } from "react-router-dom";


const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Terms" element ={<Terms/>}/>
    </Routes>
  )
}

export default Routers
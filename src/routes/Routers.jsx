import React from "react";
import Home from "../pages/Home";
import Terms from "../pages/Terms";
import { Routes, Route } from "react-router-dom";
import Success from "../pages/Success";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};

export default Routers;

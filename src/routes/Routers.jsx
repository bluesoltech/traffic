import React from "react";
import Home from "../pages/Home";
import Terms from "../pages/Terms";
import { Routes, Route } from "react-router-dom";
import Success from "../pages/Success";
import Share from "../pages/Share";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/success" element={<Success />} />
      <Route path="/share" element={<Share />} />
    </Routes>
  );
};

export default Routers;

import React from "react";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";

function Success() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center">
      <MdVerified className="text-9xl text-green-500" />
      <h1>
        You submission has been recieved successfully! Click here to go to{" "}
        <Link to="/">Form</Link>
      </h1>
    </div>
  );
}

export default Success;

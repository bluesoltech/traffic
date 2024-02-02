import React from "react";
import logo from "../../assets/img/Logo2.png";
import logo2 from "../../assets/img/Logo1.png";

import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-full sticky top-0 bg-gray-900 p-2 flex items-center justify-center z-[999] ">
      <div className="w-full px-5">
        <Link to="/">
          <img src={logo} className="w-[100px] h-auto"></img>
        </Link>
      </div>
      <div className="w-full">
        <h1 className="p-4 text-white text-5xl font-bold text-center  bg-gradient-to-tr from-[#F49724] via-[#FFFFFF] to-[#039C49] text-transparent bg-clip-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Registration Form
        </h1>
      </div>
      <div className="w-full flex justify-end px-5">
        <img src={logo2} className="w-[100px] h-auto"></img>
      </div>
    </div>
  );
}

export default Header;

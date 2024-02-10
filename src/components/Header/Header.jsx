import React, { useEffect, useState } from "react";
import logo from "../../assets/img/Logo2.png";
import logo2 from "../../assets/img/Logo1.png";

import { Link, useLocation } from "react-router-dom";

function Header() {
  const [vis, setVis] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // console.log(location.pathname);
    if (location.pathname == "/share") {
      setVis(false);
    } else {
      setVis(true);
    }
  }, [location]);
  return (
    <div className=" w-full sticky top-0 bg-gray-900 p-2 flex items-center justify-center z-[999] ">
      <div className="w-[25%] px-5">
        <Link to="/">
          <img src={logo} className="w-[100px] h-auto"></img>
        </Link>
      </div>
      <div className={vis ? "w-[50%] " : "w-[50%] opacity-0"}>
        <h1 className="p-4 text-white text-xl md:text-5xl font-bold text-center  bg-gradient-to-tr from-[#F49724] via-[#FFFFFF] to-[#039C49] text-transparent bg-clip-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          Registration Form
        </h1>
      </div>
      <div className="w-[25%] flex justify-end px-5">
        <img src={logo2} className="w-[125px] h-auto"></img>
      </div>
    </div>
  );
}

export default Header;

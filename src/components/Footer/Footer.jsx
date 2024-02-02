import React from "react";
import logo from "../../assets/img/Logo2.png";
import { MdFacebook } from "react-icons/md";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="w-full bg-gray-900 text-white h-auto p-6">
      <div className=" flex justify-evenly text-white items-center">
        <div className="">
          <Link to="/terms">Terms & Condition</Link>
        </div>
        <Link to="/" className="">
          <img src={logo} alt="no_img" />
        </Link>
        <div className="flex sm:justify-evenly">
          <Link
            to="https://www.facebook.com/AhmedabadTrafficPolice?mibextid=JRoKGi"
            className="m-2"
          >
            <MdFacebook size={30} />
          </Link>
          <Link
            to="https://www.instagram.com/ahmedabad_traffic_police?igsh=MXY2bnRuMHpnamhkbw=="
            className="m-2"
          >
            <FaInstagram size={30} />
          </Link>
          <Link to="https://x.com/policeahmedabad?s=21" className="m-2">
            <FaTwitter size={30} />
          </Link>
        </div>
      </div>
      <hr className="mt-4"></hr>
      <div className=" flex-col justify-center text-center mt-6">
        <p>This Website is Created & Managed by BlueSoltech</p>
        <p>©COPYRIGHT BlueSoltech2023-24</p>
      </div>
    </div>
  );
}

export default Footer;

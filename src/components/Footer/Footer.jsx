import React from "react";
import logo from "../../assets/img/Logo2.png";
import { MdFacebook } from "react-icons/md";
import { FaInstagram ,FaLinkedin ,FaTwitter } from "react-icons/fa";




function Footer() {
  return (
    <div className="w-full bg-gray-900 text-white h-auto p-6">
      <div className=" flex justify-evenly text-white items-center">
        <div className="">
          <h2>Terms & Condition</h2>
        </div>
        <div className="">
          <img src={logo} alt="no_img" />
        </div>
        <div className="flex sm:justify-evenly">
          <div className="m-2">
            <MdFacebook size={30} />
          </div>
          <div className="m-2">
            <FaInstagram size={30} />
          </div>
          <div className="m-2">
            <FaTwitter size={30} />
          </div>
          <div className="m-2">
            <FaLinkedin size={30} />
          </div>
        </div>
      </div>
      <hr className="mt-4"></hr>
      <div className=" flex-col justify-center text-center mt-6">
        <p>This Website is Created & Managed by BlueSoltech</p>
        <p>©COPYRIGHT BlueSoltech2023-24</p>
      </div>
    </div>
  )
}

export default Footer;

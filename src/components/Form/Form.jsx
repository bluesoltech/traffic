import React, { useState, useEffect } from "react";
import { DatePicker } from "rsuite";

import FileUpload from "../File/FileUpload";
import { db, imgDb } from "./Config.js";
import { v4 } from "uuid";
import { ref } from "firebase/storage";
import { toast } from "react-toastify";

function Form() {
  const [painting, setPainting] = useState("");
  const [video, setVideo] = useState("");
  const [poster, setPoster] = useState("");
  const [slogan, setSlogan] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    dob: null,
    address: "",
    pincode: "",
    category: "slogan",
    slogan: slogan,
    poster: poster,
    video: video,
    painting: painting,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      ["slogan"]: slogan,
      ["poster"]: poster,
      ["video"]: video,
      ["painting"]: painting,
    });
  }, [slogan, video, poster, painting]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormClear = () => {
    setFormData({
      ["fname"]: "",
      ["lname"]: "",
      ["phone"]: "",
      ["email"]: "",
      ["dob"]: null,
      ["address"]: "",
      ["pincode"]: "",
      ["category"]: "slogan",
    });
  };

  const handleDobInputChange = (date) => {
    setFormData({
      ...formData,
      ["dob"]: date,
    });
  };

  const send = async (e) => {
    e.preventDefault();
    console.log(formData.slogan);
    if (formData.slogan == "") {
      toast.error("Slogan not Uploaded!");
      return;
    }
    console.log("entered");
  };

  return (
    <div className="bg-gray-200 h-full flex justify-center items-center">
      <div className=" md:w-[65%] bg-white p-5 flex flex-col">
        <div className="border-b-[1px] border-gray-400"></div>
        <div className="">
          <form className="flex flex-col gap-5 mb-6" onSubmit={send}>
            <h1 className="text-xl text-gray-500 my-5">Personal Info</h1>
            <div className="md:flex justify-evenly gap-3">
              <input
                required
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
                placeholder="Enter First Name?"
                className=" w-full focus:outline-none border-b-[1px] border-gray-400"
              ></input>
              <input
                required
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
                placeholder="Enter Last Name?"
                className=" w-full focus:outline-none border-b-[1px] border-gray-400"
              ></input>
            </div>
            <div className="md:flex justify-evenly gap-3">
              <input
                required
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter Phone Number?"
                className=" w-full focus:outline-none border-b-[1px] border-gray-400"
              ></input>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter E-mail Address?"
                className=" w-full focus:outline-none border-b-[1px] border-gray-400"
              ></input>
              <div className="w-full flex justify-center">
                <DatePicker
                  required
                  oneTap
                  value={formData.dob}
                  onChange={handleDobInputChange}
                  placeholder="Select Date"
                  style={{ width: 200 }}
                />
              </div>
            </div>
            <div className="flex justify-evenly gap-3">
              <input
                required
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your Address?"
                className=" w-full focus:outline-none border-b-[1px] border-gray-400"
              ></input>
              <input
                required
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                type="number"
                min="0"
                max="999999"
                placeholder="Enter your Pincode?"
                className=" w-full focus:outline-none border-b-[1px] border-gray-400"
              ></input>
            </div>
            <div className="md:flex justify-center gap-3 ">
              <div className="border-[1px] px-2 rounded">
                <label className="text-gray-400">Category:</label>
                <select
                  value={formData.category}
                  onChange={handleInputChange}
                  name="category"
                  className="outline-none focus:outline-none w-[200px] text-center"
                >
                  <option className="border-none  text-center" value="slogan">
                    Best Slogan
                  </option>
                  <option className="border-none  text-center" value="video">
                    Best Video
                  </option>
                  <option className="border-none  text-center" value="painting">
                    Best Painting
                  </option>
                  <option className="border-none  text-center" value="poster">
                    Best Poster
                  </option>
                </select>
              </div>
            </div>
            <FileUpload
              formData={formData}
              setVideo={setVideo}
              setPainting={setPainting}
              setPoster={setPoster}
              setSlogan={setSlogan}
            />
            <div className="w-full flex justify-end">
              <button
                type="button"
                className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-1 rounded-xl  focus:outline-none mx-3"
                onClick={handleFormClear}
              >
                Clear
              </button>
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-1 rounded-xl  focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="border-b-[1px] border-gray-400"></div>
      </div>
    </div>
  );
}

export default Form;

import React, { useState, useEffect } from "react";
import { DatePicker } from "rsuite";

import FileUpload from "../File/FileUpload";
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
    // console.log(slogan);
    setFormData({
      ...formData,
      ["slogan"]: slogan,
      ["poster"]: "",
      ["video"]: "",
      ["painting"]: "",
    });

    // console.log(formData);
  }, [slogan]);
  useEffect(() => {
    // console.log(slogan);
    setFormData({
      ...formData,
      ["slogan"]: "",
      ["poster"]: "",
      ["video"]: video,
      ["painting"]: "",
    });

    // console.log(formData);
  }, [video]);
  useEffect(() => {
    // console.log(slogan);
    setFormData({
      ...formData,
      ["slogan"]: "",
      ["poster"]: poster,
      ["video"]: "",
      ["painting"]: "",
    });

    // console.log(formData);
  }, [poster]);
  useEffect(() => {
    // console.log(slogan);
    setFormData({
      ...formData,
      ["slogan"]: "",
      ["poster"]: "",
      ["video"]: "",
      ["painting"]: painting,
    });

    // console.log(formData);
  }, [painting]);

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
      ["slogan"]: "",
      ["painting"]: "",
      ["poster"]: "",
      ["video"]: "",
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
    if (formData.dob == null) {
      toast.error("Date of Birth is Invalid");
      return;
    } else if (formData[formData.category] == "") {
      toast.error("File not Uploaded!");
      return;
    } else {
      let data;

      if (formData.category == "slogan") data = formData.slogan;
      else if (formData.category == "painting") data = formData.painting;
      else if (formData.category == "poster") data = formData.poster;
      else data = formData.video;

      const { fname, lname, phone, email, dob, address, pincode, category } =
        formData;
      // console.log(formData);
      const existingData = await fetch(
        "https://traffic-police-b02cc-default-rtdb.asia-southeast1.firebasedatabase.app/UserData.json"
      );
      const existingDataJson = await existingData.json();
      let emailExists, phoneExists;
      if (existingDataJson) {
        emailExists = Object.values(existingDataJson).find(
          (user) => user.email === formData.email
        );
        phoneExists = Object.values(existingDataJson).some(
          (user) => user.phone === formData.phone
        );
      }
      // console.log(emailExists);
      if (emailExists) {
        toast.error("Email already exists. Please use a different email.");
      } else if (phoneExists) {
        toast.error(
          "Phone number already exists. Please use a different phone number."
        );
      } else {
        const options = {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname,
            lname,
            phone,
            email,
            dob,
            address,
            pincode,
            category,
            data,
          }),
        };
        const res = await fetch(
          "https://traffic-police-b02cc-default-rtdb.asia-southeast1.firebasedatabase.app/UserData.json",
          options
        );

        if (res) {
          toast.success("Submission Complete");
        } else {
          toast.error("Some Error Occured!");
        }
      }
    }
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
                  placeholder="Select Date of Birth"
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

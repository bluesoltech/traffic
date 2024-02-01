import { useState, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { toast } from "react-toastify";

function FileUploadSlogan({ setSlogan }) {
  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const [slogan, setSloganData] = useState("");

  const handleSolganSubmit = () => {
    if (slogan == "") {
      toast.error("Enter Something First!");
    } else if (slogan) {
      const words = slogan.trim().split(" ");
      if (words.length > 25) {
        toast.error("More Than 25 Words!");
      } else if (inputRef.current) {
        toast.success("Uploaded Successfully!");
        setSlogan(slogan);
        inputRef.current.disabled = true;
        btnRef.current.disabled = true;
      }
    }
  };

  return (
    <div className="w-full bg-gray-200 p-4 rounded flex flex-col items-center justify-center">
      <div className="w-full flex justify-center">
        <input
          id="ref"
          ref={inputRef}
          required
          value={slogan}
          onChange={(e) => {
            setSloganData(e.target.value);
          }}
          placeholder="Enter Your Slogan"
          className="focus:outline-none w-[65%] h-[50px] text-xl p-2"
        />
        <button
          ref={btnRef}
          type="button"
          onClick={handleSolganSubmit}
          className="text-center bg-white px-4 hover:font-bold focus:outline-none"
        >
          Upload
        </button>
      </div>
      <div className="w-full flex p-4 items-center">
        <FaInfoCircle className="mr-2" />
        <h1>Maximum 25 Words</h1>
      </div>
    </div>
  );
}

export default FileUploadSlogan;

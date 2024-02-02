import { useState, useRef } from "react";
import { FaInfoCircle, FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

function FileUploadSlogan({ setSlogan }) {
  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const cancelRef = useRef(null);
  const [slogan, setSloganData] = useState("");

  const handleSolganSubmit = () => {
    if (slogan == "") {
      toast.error("Enter Something First!");
      return;
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
  const handleSolganCancel = () => {
    if (slogan == "") {
      toast.error("Nothing to clear");
      inputRef.current.disabled = false;
      // btnRef.current.disabled = false;
      return;
    } else if (slogan) {
      toast.success("Cleared Successfully!");
      setSloganData("");
      setSlogan("");
      inputRef.current.disabled = false;
      // btnRef.current.disabled = false;
    }
  };

  return (
    <div className="w-full bg-gray-200 p-4 rounded flex flex-col items-center justify-center">
      <div className="w-full flex gap-3 justify-center items-center">
        <input
          id="ref"
          ref={inputRef}
          required
          value={slogan}
          onChange={(e) => {
            setSloganData(e.target.value);
          }}
          placeholder="Enter Your Slogan"
          className="focus:outline-none w-[65%] h-[50px] text-xl p-2 rounded xl"
        />
        {/* <button
          ref={btnRef}
          type="button"
          onClick={handleSolganSubmit}
          className="text-center bg-white mx-2  px-4 hover:font-bold focus:outline-none h-full"
        >
          Upload
        </button> */}
        {!inputRef?.current?.disabled && (
          <button type="button" ref={btnRef} onClick={handleSolganSubmit}>
            <FaCloudUploadAlt className="text-4xl text-green-700 hover:text-green-800" />
          </button>
        )}
        {inputRef?.current?.disabled && (
          <button type="button" ref={cancelRef} onClick={handleSolganCancel}>
            <MdCancel className="text-4xl text-red-700 hover:text-red-800" />
          </button>
        )}
      </div>
      <div className="w-full flex p-4 items-center">
        <FaInfoCircle className="mr-2" />
        <h1>Maximum 25 Words</h1>
      </div>
    </div>
  );
}

export default FileUploadSlogan;

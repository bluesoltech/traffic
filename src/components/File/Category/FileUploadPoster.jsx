import { useState, useRef } from "react";
import { FaInfoCircle, FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import app from "../../Form/Config.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const metadata = {
  contentType: "image/*",
};

function FileUploadPoster({ setPoster }) {
  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const cancelRef = useRef(null);
  const [poster, setPosterdata] = useState(undefined);
  const [status, setStatus] = useState(0);
  const [storageRef, setStorageRef] = useState("");

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const fileRef = ref(storage, "posters/" + fileName);
    setStorageRef(fileRef);
    const uploadTask = uploadBytesResumable(fileRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setStatus(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
        switch (error.code) {
          case "storage/unauthorized":
            console.log(error);
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("Download URL", downloadURL);
          setPoster(downloadURL);
        });
      }
    );
  };

  const handlePosterSubmit = () => {
    if (poster == undefined) {
      toast.error("Upload Something First!");
      return;
    } else if (poster.size > 25 * 1024 * 1024) {
      // console.log("fndsdnfasndkn");
      toast.error("File size greater than 10MB");
      return;
    } else {
      uploadFile(poster);
      inputRef.current.disabled = true;
      // toast.success("Successfully Uploaded!");
    }
  };
  const handlePosterCancel = () => {
    if (poster == undefined) {
      toast.error("Nothing to clear");
      inputRef.current.disabled = false;
      return;
    } else {
      deleteObject(storageRef)
        .then(() => {
          toast.success("Successfully Deleted!");
          // File deleted successfully
        })
        .catch((error) => {
          toast.success("Uh-oh, an error occurred!");
          // Uh-oh, an error occurred!
        });
      setPoster("");
      setPosterdata(undefined);
      setStatus(0);
      setStorageRef("");
      inputRef.current.disabled = false;
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full bg-gray-200 p-4 rounded flex flex-col items-center justify-center">
      <div className="w-full flex gap-3 justify-center items-center">
        <input
          ref={inputRef}
          type="file"
          accept=".jpg, .jpeg"
          required
          className="focus:outline-none w-[65%] h-[50px] text-md p-2 rounded xl"
          onChange={(e) => setPosterdata((prev) => e.target.files[0])}
        />
        {!inputRef?.current?.disabled && (
          <button type="button" ref={btnRef} onClick={handlePosterSubmit}>
            <FaCloudUploadAlt className="text-4xl text-green-700 hover:text-green-800" />
          </button>
        )}
        {status > 0 && status < 99 && "Uploading: " + status + "%"}
        {status == 100 && "Uploaded"}
        {inputRef?.current?.disabled && status > 0 && status < 99 && (
          <button type="button" ref={cancelRef} disabled>
            <MdCancel className="text-4xl text-red-700 hover:text-red-800" />
          </button>
        )}
        {inputRef?.current?.disabled && status == 100 && (
          <button type="button" ref={cancelRef} onClick={handlePosterCancel}>
            <MdCancel className="text-4xl text-red-700 hover:text-red-800" />
          </button>
        )}
      </div>
      <div className="w-full  p-4 flex flex-col justify-center">
        <div className="flex items-center">
          <FaInfoCircle className="mr-2" />
          <p>
            File size should not exceed more than <strong>25MB</strong>.
          </p>
        </div>
        <div className="flex items-center">
          <FaInfoCircle className="mr-2" />
          <p>
            Supported media files are: <strong>.jpeg</strong>, and{" "}
            <strong>.jpg</strong>
          </p>
        </div>
        <div className="flex items-center">
          <FaInfoCircle className="mr-2" />
          <p>Any duplicate poster will be disqulaified.</p>
        </div>
      </div>
    </div>
  );
}

export default FileUploadPoster;

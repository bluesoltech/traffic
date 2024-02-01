import React from "react";
import FileUploadVideo from "./Category/FileUploadVideo";
import FileUploadSlogan from "./Category/FileUploadSlogan";
import FileUploadPoster from "./Category/FileUploadPoster";
import FileUploadPainting from "./Category/FileUploadPainting";

function FileUpload({ formData, setPainting, setVideo, setSlogan, setPoster }) {
  switch (formData.category) {
    case "video":
      return <FileUploadVideo setVideo={setVideo} />;
    case "painting":
      return <FileUploadPainting setPainting={setPainting} />;
    case "poster":
      return <FileUploadPoster setPoster={setPoster} />;
    default:
      return <FileUploadSlogan setSlogan={setSlogan} />;
  }
}

export default FileUpload;

// import React, { useState } from "react";
// import ReactCrop from "react-image-crop";

// function Share() {
//   const [image, setImage] = useState(undefined);
//   const [crop, setCrop] = useState(undefined);
//   const handleImageUpload = (e) => {
//     setImage(URL.createObjectURL(e.target.files[0]));
//   };
//   return (
//     <div className="h-screen flex flex-col items-center justify-center">
//       <input
//         type="file"
//         accept=".jpg, .jpeg"
//         required
//         className=""
//         onChange={handleImageUpload}
//       />
//       <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
//         <img src={image} className="w-[200px] h-auto" alt="" />
//       </ReactCrop>
//     </div>
//   );
// }

// export default Share;
import {
  TbAspectRatioOff,
  TbAspectRatio,
  TbZoomInFilled,
  TbZoomOutFilled,
} from "react-icons/tb";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";

import React, { useState, useRef } from "react";
import post from "../assets/img/post2.png";
import "./Share.css";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";
import { canvasPreview } from "../components/Share/canvasPreview";
import { useDebounceEffect } from "../components/Share/useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function App() {
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [nameI, setIName] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(9 / 9);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadPosterClick() {
    const image = imgRef.current;
    var previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    const offscreen = new OffscreenCanvas(1080, 1080);
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }
    var base_image = new Image();
    base_image.src = post;

    // base_image.onload = function (){
    //   console.log(base_image)
    // }
    ctx.drawImage(base_image, 0, 0, 1080, 1080);
    ctx.font = "48px serif";
    ctx.textAlign = "center";
    var textWidth = ctx.measureText(name).width;
    const leftI = (600 / textWidth / 2) * textWidth;
    ctx.fillText(name, leftI, 766, 300);
    ctx.beginPath();
    const radius = 450 / 2; // Radius of the circle
    const centerX = 582 + radius; // X-coordinate of the circle's center
    const centerY = 526 + radius; // Y-coordinate of the circle's center
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); // Draw the circle
    ctx.closePath();

    // Clip the offscreen canvas to the circular path
    ctx.clip();
    ctx.drawImage(previewCanvas, 582, 526, 450, 450);
    // ctx.drawImage(
    //   previewCanvas,
    //   0,
    //   0,
    //   previewCanvas.width,
    //   previewCanvas.height,
    //   0,
    //   0,
    //   offscreen.width,
    //   offscreen.height,
    // )
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current;
      hiddenAnchorRef.current.click();
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(9 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 9 / 9);
        setCrop(newCrop);
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  return (
    <div className="z-1 flex flex-col items-center justify-center p-5  justify-evenly overflow-hidden">
      <h1 className="text-4xl font-bold text-black border-[1px] px-4 py-2 rounded-xl ">
        Share Event
      </h1>
      {!!imgSrc && (
        <div className={done ? "" : ""}>
          <div className="flex items-center justify-between">
            <a href="/share" className="">
              <div className="flex items-center">
                <FaHome className="text-xl m-4" />
                Home
              </div>
            </a>
            {!done ? (
              <button
                onClick={() => {
                  completedCrop ? setDone(true) : "";
                }}
                className="bg-blue-500 h-fit text-white px-4 py-1 rounded-xl hover:bg-blue-700"
              >
                Done
              </button>
            ) : (
              <p>Scroll Down</p>
            )}
          </div>

          {done ? (
            <ReactCrop
              disabled
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              minHeight={50}
              circularCrop
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                className="max-w-[300px] h-auto md:w-[600px]"
                onLoad={onImageLoad}
              />
            </ReactCrop>
          ) : (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              minHeight={50}
              circularCrop
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                className="max-w-[300px] h-auto md:w-[600px]"
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
        </div>
      )}

      <div className={done ? "hidden m-3" : "m-3"}>
        {!imgSrc && (
          <div className="flex flex-col items-center justify-center gap-4 inputLelo my-10">
            <p className="text-xl">Upload your Image</p>
            <label className="bg-blue-500 p-4 rounded-[50%]" htmlFor="file">
              <LuImagePlus className="text-4xl text-white" />
            </label>
            <input
              id="file"
              className=""
              type="file"
              accept="image/*"
              onChange={onSelectFile}
            />
          </div>
        )}
        {imgSrc && (
          <div className="flex justify-center gap-10 py-3 px-5 bg-gray-200 rounded-xl">
            <div className="flex text-2xl gap-10">
              <TbZoomInFilled
                onClick={() => (scale > 10 ? "" : setScale(scale + 0.5))}
              />
              <TbZoomOutFilled
                onClick={() => (scale > 0.5 ? setScale(scale - 0.5) : "")}
              />
            </div>
            <div className="flex text-2xl gap-10">
              {/* <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          /> */}
              <FaArrowRotateRight onClick={() => setRotate(rotate + 5)} />
              <FaArrowRotateLeft onClick={() => setRotate(rotate - 5)} />
            </div>
            <div>
              <button onClick={handleToggleAspectClick}>
                {aspect ? (
                  <TbAspectRatioOff className="text-2xl" />
                ) : (
                  <TbAspectRatio className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {!!completedCrop && (
        <div className={!done ? "hidden" : "z-3"}>
          <div className="relative w-[300px] mt-5">
            <img src={post} className="" alt="" />
            {name && (
              <div className="absolute flex items-center justify-center  w-[158.055px] h-[24.722px] top-[196.11px] left-[4.825px]">
                <p className=" uppercase font-bold text-[12px] top-[706px]">
                  {name}
                </p>
              </div>
            )}
            <div className="absolute max-w-[125px] max-h-[125px] top-[48.777%] right-[4.32%]">
              <canvas
                ref={previewCanvasRef}
                className="rounded-[50%] w-[125px] h-[125px]"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
          {!name && (
            <div className="flex items-center gap-4">
              <input
                type="text"
                className="w-full my-4 py-2 px-4 border-[1px] rounded focus:outline-none"
                maxLength="15"
                onChange={(e) => {
                  setIName(e.target.value);
                }}
                placeholder="Enter Name"
              />{" "}
              <button
                onClick={() => {
                  setName(nameI);
                }}
                className="bg-blue-500 h-fit py-2 px-4 rounded-xl text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          )}
          {name && (
            <div>
              <button
                onClick={onDownloadPosterClick}
                className="bg-blue-500 text-white py-2 px-4 rounded-xl m-2"
              >
                Download Image
              </button>
              <a
                href="#hidden"
                ref={hiddenAnchorRef}
                download
                style={{
                  position: "absolute",
                  top: "-200vh",
                  visibility: "hidden",
                }}
              >
                Hidden download
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

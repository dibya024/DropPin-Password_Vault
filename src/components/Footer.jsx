import React from "react";
import loveImg from "../images/love-img.jpg";

const Footer = () => {
  return (
    <div className="bg-black gap-2 text-white flex flex-col justify-center items-center min-h-[11vh] fixed bottom-0 w-full">
      <div className="text-left font-bold text-2xl cursor-pointer">
        <span className="text-white">&lt;</span>
        <span className="text-orange-500">Drop</span>
        <span className="text-blue-600">Pin</span>
        <span className="text-white">/&gt;</span>
      </div>
      <div className="flex">
        Created with <img src={loveImg} className="h-6 w-6 mx-2" /> by Dibyaranjan
      </div>
    </div>
  );
};

export default Footer;

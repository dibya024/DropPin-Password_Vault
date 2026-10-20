import React from "react";

const Navbar = () => {
  return (
    <nav className=" bg-orange-500">
      <div className="myContainer flex justify-around items-center px-4 py-4">
        <div className="logo font-bold text-3xl">
          <span className="text-black">&lt;</span>
          <span className="text-white">Drop</span>
          <span className="text-blue-600">Pin</span>
          <span className="text-black">/&gt;</span>
        </div>
        <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="#">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact Us
            </a>
            <a className="hover:font-bold" href="#">
              Help
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

//{rafce}//

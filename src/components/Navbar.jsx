import Case from "./Case";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/Empty Div.svg";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-white w-full sm:py-6 py-7 shadow-xl sm:mb-4 fixed z-40">
      <Case>
        <div className="flex items-center">
          <Link
            className="mr-2 text-2xl sm:text-3xl font-semibold text-slate-900 flex absolute"
            to="/"
          >
            <img src={logo} alt="" className="scale-150" />
            KingRoom
          </Link>
          <div className="hidden mx-auto text-xl space-x-5 sm:flex">
            <div>
              <a href="/#home">Home</a>
            </div>
            <div>
              <a href="/#about">About</a>
            </div>
            <div>
              <a href="/#how">Tutorial</a>
            </div>
            <div>
              <a href="/#footer">Contact</a>
            </div>
          </div>
          <div className=" text-lg sm:text-xl absolute right-32 hidden sm:block p-2 bg=[#BC4141]">
            <NavLink href="/login">Login</NavLink>
          </div>
          <div className="ml-auto sm:hidden" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      </Case>
      {/* Move sidebar outside of Case component */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="grid space-y-3">
          <a href="/#home">Home</a>
          <a href="/#about">About</a>
          <a href="/#how">Tutorial</a>
          <a href="/#footer">Contact</a>
          <NavLink href="/login">Login</NavLink>
        </div>
      </div>
    </div>
  );
}

import Case from "./Case";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Empty Div.svg";
import Api from "../api/Api";
import Cookies from "js-cookie";

export default function NavbarUser() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await Api.post("/api/logout");
      Cookies.remove("user");
      Cookies.remove("token");
      Cookies.remove("permissions");
      console.log("Logout Berhasil!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Handle error or show an error toast
    }
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
              <a href="/home/#booking">Booking</a>
            </div>
            <div>
              <a href="/home/#room">Room</a>
            </div>
            <div>
              <a href="/home/#history">History</a>
            </div>
          </div>
          <div className=" text-lg sm:text-xl absolute right-32 hidden sm:block">
            <button onClick={handleLogout}>Logout</button>
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
          <a href="/home/#booking">Booking</a>
          <a href="/home/#room">Room</a>
          <a href="/home/#history">History</a>
          <button onClick={handleLogout} className="flex">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

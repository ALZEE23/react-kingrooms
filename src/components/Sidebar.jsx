import { useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  HomeIcon,
  MailIcon,
  MenuIcon,
  UserCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

const Sidebar = ({ onToggle }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    onToggle(!collapsed); // Panggil fungsi onToggle dan kirimkan status terbaru
  };

  return (
    <div
      className={`shadow-2xl text-white h-screen ${collapsed ? "sm:w-16 w-0 sm:block sm:relative hidden fixed" : "sm:w-72 sm:relative sm:block hidden fixed"} transition-all duration-300 pt-2`}
    >
      {/* Sidebar Content */}
      <div className="block">
        <div className="grid">
          <button
            onClick={toggleSidebar}
            className="text-white p-3 focus:outline-none flex scale-100 border shadow-lg mx-2 my-1 rounded-2xl"
          >
            {collapsed ? (
              <MenuIcon
                className="h-6 w-6 ml-0 transition-transform duration-700"
                style={{ color: "blue" }}
              />
            ) : (
              <XIcon
                className="h-6 w-6 ml-0 transition-transform duration-700"
                style={{ color: "blue" }}
              />
            )}
            {!collapsed && (
              <span className="absolute left-12 transition-all duration-700 text-blue-600 font-semibold">
                KingRoom
              </span>
            )}
          </button>
        </div>
        {collapsed ? (
          <div className=" grid mx-auto">
            {!collapsed && <img src={""} className="scale-75" />}
            <NavLink
              to="/dashboard"
              className="text-white p-3 focus:outline-none flex border shadow-lg mx-2 my-1 rounded-2xl"
            >
              <HomeIcon className="h-6 w-6" style={{ color: "blue" }} />
              {!collapsed && <span className="left-12 absolute ">Beranda</span>}
            </NavLink>
            <NavLink
              to="/booking"
              className="text-white p-3 focus:outline-none flex border shadow-lg mx-2 my-1 rounded-2xl"
            >
              <CalendarIcon className="h-6 w-6" style={{ color: "blue" }} />
              {!collapsed && (
                <span className="left-12 absolute">Booking Temu Janji</span>
              )}
            </NavLink>
            <NavLink
              to="/room"
              className="text-white p-3 focus:outline-none flex border shadow-lg mx-2 my-1 rounded-2xl"
            >
              <ClockIcon className="h-6 w-6" style={{ color: "blue" }} />
              {!collapsed && (
                <span className="left-12 absolute">Riwayat Pertemuan</span>
              )}
            </NavLink>
            <NavLink
              to="/user"
              className="text-white p-3 focus:outline-none flex border shadow-lg mx-2 my-1 rounded-2xl"
            >
              <UserCircleIcon className="h-6 w-6" style={{ color: "blue" }} />
              {!collapsed && <span className="absolute left-12">User</span>}
            </NavLink>
            {/* <NavLink
              to="/history"
              className="text-white p-3 focus:outline-none flex border shadow-lg mx-2 my-1 rounded-2xl"
            >
              <MailIcon className="h-6 w-6" style={{ color: "blue" }} />
              {!collapsed && <span className="absolute left-12">Chat</span>}
            </NavLink> */}
          </div>
        ) : (
          <div className=" grid mx-auto">
            {!collapsed && <img src={""} className="scale-100" />}
            <NavLink
              to="/dashboard"
              className="text-white p-3 focus:outline-none flex border shadow-lg mx-2 my-1 rounded-2xl"
            >
              <HomeIcon className="h-6 w-6" style={{ color: "blue" }} />
              {!collapsed && (
                <span className="left-[3.5rem] absolute text-blue-600 font-semibold transition-all duration-1000">
                  Beranda
                </span>
              )}
            </NavLink>
            <NavLink
              to="/booking"
              className="text-white p-3 focus:outline-none flex border shadow-lg mx-2 my-1 rounded-2xl"
            >
              <CalendarIcon className="h-6 w-6" style={{ color: "blue" }} />
              {!collapsed && (
                <span className="left-[3.5rem] absolute text-blue-600 font-semibold transition-all duration-1000">
                  Booking
                </span>
              )}
            </NavLink>
            <NavLink
              to="/room"
              className="text-white p-3 focus:outline-none flex border shadow-lg mx-2 my-1 rounded-2xl"
            >
              <ClockIcon className="h-6 w-6" style={{ color: "blue" }} />
              {!collapsed && (
                <span className="left-[3.5rem] absolute text-blue-600 font-semibold transition-all duration-1000">
                  Room
                </span>
              )}
            </NavLink>
            <NavLink
              to="/user"
              className="text-white p-3 focus:outline-none flex border shadow-lg mx-2 my-1 rounded-2xl"
            >
              <UserCircleIcon className="h-6 w-6" style={{ color: "blue" }} />
              {!collapsed && (
                <span className="left-[3.5rem] absolute text-blue-600 font-semibold transition-all duration-1000">
                  User
                </span>
              )}
            </NavLink>
            {/* <NavLink
              to="/history"
              className="text-white p-3 focus:outline-none flex border shadow-lg mx-2 my-1 rounded-2xl"
            >
              <MailIcon className="h-6 w-6" style={{ color: "blue" }} />
              {!collapsed && (
                <span className="left-[3.5rem] absolute text-blue-600 font-semibold transition-all duration-1000">
                  Chat
                </span>
              )}
            </NavLink> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

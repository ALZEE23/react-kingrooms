import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { fetchUser } from "../api/Api";
import Sidebar from "../components/Sidebar";
import Api from "../api/Api";
import NavLink from "@/components/NavLink";
import { LogoutIcon,MenuIcon } from "@heroicons/react/outline";

export default function User() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUser();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error fetching bookings
      }
    };

    fetchUserData();
  }, []);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <nav className=" w-full h-16 shadow-xl px-4 flex items-center">
            <h1 className="text-xl font-semibold text-blue-600">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="text-white p-3 focus:outline-none scale-90 border shadow-lg ml-auto rounded-2xl hidden sm:flex"
            >
              <LogoutIcon
                className="h-6 w-6 transition-transform duration-700"
                style={{ color: "blue" }}
              />
              <span className=" transition-all duration-700 text-blue-600 font-semibold">
                Logout
              </span>
            </button>
            <button
              onClick={toggleSidebar}
              className="text-white p-3 focus:outline-none scale-90 border shadow-lg ml-auto rounded-2xl block sm:hidden"
            >
              <MenuIcon
                className="h-6 w-6 transition-transform duration-700"
                style={{ color: "blue" }}
              />
            </button>
            <div
              className={`fixed top-0 left-0 h-full w-64 z-30 bg-gray-800 text-white p-4 transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              <div className="grid space-y-3">
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/booking">Booking</NavLink>
                <NavLink href="/room">Room</NavLink>
                <NavLink href="/user">User</NavLink>
                <button onClick={handleLogout} className="flex">
                  Logout
                </button>
              </div>
            </div>
          </nav>
          <section className="flex-grow relative">
            <div className="flex px-3 sm:px-5">
              <div>
                <div className="mx-auto mt-10 flex"></div>
                <div className="flex mx-auto">
                  <img
                    src={""}
                    alt=""
                    className=" scale-50 sm:scale-75 mx-auto"
                  />
                </div>
              </div>
            </div>
            <div className="relative shadow-xl sm:rounded-lg mx-5 my-6 overflow-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                    >
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
``;

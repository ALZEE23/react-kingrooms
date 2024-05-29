import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../api/Api";
import Sidebar from "../components/Sidebar";
import { fetchDashboard } from "../api/Api";
import NavLink from "@/components/NavLink";
import { useState, useEffect } from "react";
import {
  LogoutIcon,
  MailIcon,
  MenuIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { DashboardIcon, TableIcon } from "@radix-ui/react-icons";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    const fetchData = async () => {
      try {
        const data = await fetchDashboard();
        setDashboardData(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const permissionsCookie = Cookies.get("permissions");
    const permissions = permissionsCookie ? JSON.parse(permissionsCookie) : {};

    if (!permissions["users.index"]) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <nav className="w-full h-16 shadow-xl px-4 flex items-center">
            <h1 className="text-xl font-semibold text-blue-600">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="text-white p-3 focus:outline-none scale-90 border shadow-lg ml-auto rounded-2xl hidden sm:flex"
            >
              <LogoutIcon
                className="h-6 w-6 transition-transform duration-700"
                style={{ color: "blue" }}
              />
              <span className="transition-all duration-700 text-blue-600 font-semibold">
                Logout
              </span>
            </button>
            <button
              onClick={toggleSidebar}
              className="text-white p-3 focus:outline-none scale-90 border shadow-lg ml-auto rounded-2xl flex sm:hidden"
            >
              <MenuIcon
                className="h-6 w-6 transition-transform duration-700"
                style={{ color: "blue" }}
              />
            </button>
            <div
              className={`fixed top-0 left-0 h-full w-64 z-30 bg-gray-800 text-white p-4 transition-all duration-300 transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
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
              <div className="grid grid-cols-2 sm:grid-cols-4 mt-7 gap-4 sm:gap-7 mx-auto">
                {dashboardData && (
                  <>
                    <div className="w-44 sm:w-64 flex border justify-between py-2 rounded-xl shadow-xl">
                      <div className="block  mx-3">
                        <h1 className="text-lg font-semibold">Users</h1>
                        <h1 className="text-3xl ">
                          {dashboardData.users_count}
                        </h1>
                      </div>
                      <div className="flex  mr-1">
                        <UserGroupIcon
                          className="w-9 h-9 my-auto mx-2"
                          style={{ color: "blue" }}
                        />
                      </div>
                    </div>
                    <div className="w-44 sm:w-64 flex border justify-between py-2 rounded-xl shadow-xl">
                      <div className="block mx-3">
                        <h1 className="text-lg font-semibold">Pending</h1>
                        <h1 className="text-3xl ">
                          {dashboardData.pending_bookings_count}
                        </h1>
                      </div>
                      <div className="flex mr-1">
                        <MailIcon
                          className="w-9 h-9 my-auto mx-2"
                          style={{ color: "blue" }}
                        />
                      </div>
                    </div>
                    <div className="w-44 sm:w-64 flex border justify-between py-2 rounded-xl shadow-xl">
                      <div className="block mx-3">
                        <h1 className="text-lg font-semibold">Booking</h1>
                        <h1 className="text-3xl ">
                          {dashboardData.bookings_count}
                        </h1>
                      </div>
                      <div className="flex mr-1">
                        <DashboardIcon
                          className="w-9 h-9 my-auto mx-2"
                          style={{ color: "blue" }}
                        />
                      </div>
                    </div>
                    <div className="w-44 sm:w-64 flex border justify-between py-2 rounded-xl shadow-xl">
                      <div className="block  mx-3">
                        <h1 className="text-lg font-semibold">Room</h1>
                        <h1 className="text-3xl ">
                          {dashboardData.rooms_count}
                        </h1>
                      </div>
                      <div className="flex  mr-1">
                        <TableIcon
                          className="w-9 h-9 my-auto mx-2"
                          style={{ color: "blue" }}
                        />
                      </div>
                    </div>
                    {/* Tambahkan kode untuk menampilkan data lainnya di sini */}
                  </>
                )}
              </div>
              
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

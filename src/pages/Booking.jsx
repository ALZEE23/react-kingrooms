import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { fetchBookings,deleteBooking } from "../api/Api";
import Sidebar from "../components/Sidebar";
import Api from "../api/Api";
import NavLink from "@/components/NavLink";
import { LogoutIcon, MenuIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export default function Booking() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [showOptions, setShowOptions] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const bookingData = await fetchBookings();
        setBookings(bookingData);
        setShowOptions(Array(bookingData.length).fill(false));
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookingData();
  }, []);

  const toggleOptions = (index) => {
    const newShowOptions = [...showOptions];
    newShowOptions[index] = !newShowOptions[index];
    setShowOptions(newShowOptions);
  };

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
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleEditClick = (bookingId) => {
    const selectedBooking = bookings.find(
      (booking) => booking.id === bookingId
    );
    setSelectedBookingId(bookingId);
    setEditingBooking(selectedBooking);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditingBooking({
      ...editingBooking,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("name", editingBooking.name);
      formData.append("start_time", editingBooking.start_time);
      formData.append("end_time", editingBooking.end_time);
      formData.append("reason", editingBooking.reason);
      formData.append("room", editingBooking.room.id);
      formData.append("status", editingBooking.status);

      await Api.put(`/api/admin/bookings/${editingBooking.id}`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log("Booking updated successfully!");
      const updatedBookings = await fetchBookings();
      setBookings(updatedBookings);
      setSelectedBookingId(null);
      setEditingBooking(null);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };
  const handleDeleteClick = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      const updatedBookings = await fetchBookings();
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <nav className=" w-full  h-16 shadow-xl px-4 flex items-center">
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
          <section className="flex-grow relative w-96 sm:w-auto overflow-x-auto">
            <div className="flex px-3 sm:px-5"></div>
            <div></div>
            <div className="relative shadow-xl sm:rounded-lg mx-5 my-6 overflow-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Start Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      End Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Reason
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Room
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr
                      key={booking.id}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {booking.user.name}
                      </th>
                      <td className="px-6 py-4">{booking.start_time}</td>
                      <td className="px-6 py-4">{booking.end_time}</td>
                      <td className="px-6 py-4">{booking.reason}</td>
                      <td className="px-6 py-4">{booking.room.name_room}</td>
                      <td className="px-6 py-4">{booking.status}</td>
                      <td className="px-6 py-4 text-right relative">
                        <button onClick={() => toggleOptions(index)}>
                          <DotsHorizontalIcon />
                        </button>
                        {showOptions[index] && (
                          <div className="absolute right-3 grid  bg-white shadow-md p-2 mt-1 rounded z-20">
                            <button onClick={() => handleEditClick(booking.id)}>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(booking.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      {selectedBookingId && editingBooking && (
        <EditBookingForm
          booking={editingBooking}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}

function EditBookingForm({ booking, onChange, onSubmit }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit Booking</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={booking.user.id} // Ubah menjadi booking.user.name atau sesuai dengan atribut yang sesuai
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="start_time"
              className="block text-gray-700 font-semibold mb-2"
            >
              Start Time
            </label>
            <input
              type="date"
              id="start_time"
              name="start_time"
              value={booking.start_time} // Ubah menjadi booking.user.name atau sesuai dengan atribut yang sesuai
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="end_time"
              className="block text-gray-700 font-semibold mb-2"
            >
              End Time
            </label>
            <input
              type="date"
              id="end_time"
              name="end_time"
              value={booking.end_time} // Ubah menjadi booking.user.name atau sesuai dengan atribut yang sesuai
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="reason"
              className="block text-gray-700 font-semibold mb-2"
            >
              Reason
            </label>
            <input
              type="text"
              id="reason"
              name="reason"
              value={booking.reason} // Ubah menjadi booking.user.name atau sesuai dengan atribut yang sesuai
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="room"
              className="block text-gray-700 font-semibold mb-2"
            >
              Room
            </label>
            <input
              type="text"
              id="room"
              name="room"
              value={booking.room.id} // Ubah menjadi booking.user.name atau sesuai dengan atribut yang sesuai
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="status"
              className="block text-gray-700 font-semibold mb-2"
            >
              Status
            </label>
            <input
              type="text"
              id="status"
              name="status"
              value={booking.status} // Ubah menjadi booking.user.name atau sesuai dengan atribut yang sesuai
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

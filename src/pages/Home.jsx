import Navbar from "../components/NavbarUser";
// import axios from "axios";
// import cuy from "../assets/HeaderImage 1 (1).svg";
// import skill1 from "../assets/Skills Card Icon (1).svg";
// import skill from "../assets/Skills Card Icon.svg";
import logo from "../assets/Empty Div.svg";
import uhuy from "../assets/Vector.svg";
import p from "../assets/p.svg";
import m from "../assets/m.svg";
import facebook from "../assets/facebook.svg";
import pinterest from "../assets/pininterest.svg";
import shape from "../assets/Shape.svg";
import linked from "../assets/Linked In.svg";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { useRef } from "react";
import { useEffect } from "react";
import { fetchHistory, fetchRooms } from "@/api/Api";
import Api from "../api/Api";
import { fetchBookingUser } from "../api/Api";
import Cookies from "js-cookie";
import { fetchBookings } from "@/api/Api";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../index.css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
// import required modules
// import { Navigation } from "swiper/modules";

export default function Home() {
  const [showSwiper, setShowSwiper] = useState(false);
  const [bookings, setBookings] = useState([]);
   useEffect(() => {
     const fetchBookingData = async () => {
       try {
         const bookingData = await fetchBookingUser();
         setBookings(bookingData);
       } catch (error) {
         console.error("Error fetching bookings:", error);
       }
     };

     fetchBookingData();
   }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setShowSwiper(true);
      } else {
        setShowSwiper(false);
      }
    };

    // Saat komponen dimuat, periksa lebar layar
    handleResize();

    // Tambahkan event listener untuk memantau perubahan ukuran layar
    window.addEventListener("resize", handleResize);

    // Hapus event listener saat komponen dibongkar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [rooms, setRooms] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData = await fetchRooms();
        setRooms(roomData);
        const bookingData = await fetchBookings();
        const bookedTimesData = bookingData.map((booking) => ({
          startTime: booking.start_time,
          endTime: booking.end_time,
          id: booking.id,
          room: booking.room,
        }));
        console.log(bookedTimesData);
        setBookedTimes(bookedTimesData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        // Handle error fetching bookings
      }
    };

    fetchRoomData();
  }, []);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const historyData = await fetchHistory();
        setHistory(historyData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchHistoryData();
  }, []);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showSlide, setShowSlide] = useState(false);
  const click = ({ onToggle }) => {
    setShowSlide(!showSlide);
    onToggle(!showSlide);
  };
  const handleBookingClick = (roomId) => {
    setSelectedRoomId(roomId);
    setRoom(roomId);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("2");
  const [room, setRoom] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = Cookies.get("token"); // Dapatkan token dari cookie
      const headers = {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const formData = new FormData();
      formData.append("reason", reason);
      formData.append("start_time", startTime);
      formData.append("room", room); // Sesuaikan dengan ID ruangan yang dipilih
      formData.append("name", name);
      formData.append("end_time", endTime);
      formData.append("status", status);
      // tambahkan field lainnya sesuai kebutuhan

      const response = await Api.post("/api/public/booking-post", formData, {
        headers,
      });
      console.log("Response:", response.data);
      setShowForm(false);
      window.location.reload();
      // Setelah berhasil menyimpan data, lakukan tindakan yang sesuai seperti menampilkan pesan sukses
    } catch (error) {
      console.error("Error:", error.response);
      // Jika terjadi error, lakukan tindakan yang sesuai seperti menampilkan pesan error
    }
  };
  useEffect(() => {
    // Ambil user id dari localStorage
    const userId = localStorage.getItem("userId");
    console.log("User ID:", userId);
    if (userId) {
      setName(userId);
    }
  }, []);

  // useEffect(() => {
  //   const token = JSON.parse(Cookies.get("token"));
  //   if (token) {
  //     console.log(token);
  //   }
  // }, []);
  return (
    <>
      <Navbar />
      <section id="booking" className="pt-28 sm:pt-40 sm:mb-16">
        <div className="grid">
          {showForm && (
            <div className="fixed inset-0 flex items-center z-20 justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Booking Form</h2>
                <form onSubmit={handleFormSubmit}>
                  {/* Input tersembunyi untuk menyimpan ID kamar yang dipilih */}
                  <input
                    type="hidden"
                    name="room"
                    id="room"
                    value={selectedRoomId}
                    onChange={(e) => setRoom(e.target.value)}
                  />
                  <input
                    type="hidden"
                    name="status"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />

                  {/* Contoh input nama */}
                  <div className="mb-4 hidden">
                    <label htmlFor="name" className="block font-semibold mb-1">
                      Name:
                    </label>
                    <input
                      type="hidden"
                      id="name"
                      name="name"
                      defaultValue={name}
                      className="w-full border-gray-300 rounded-lg px-4 py-2"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* Input start */}
                  <div className="mb-4">
                    <label
                      htmlFor="start_time"
                      className="block font-semibold mb-1"
                    >
                      Start:
                    </label>
                    <input
                      type="datetime-local"
                      id="start_time"
                      name="start_time"
                      className="w-full border-gray-300 rounded-lg px-4 py-2"
                      onChange={(e) => setStartTime(e.target.value)}
                      disabled={bookedTimes.some((time) => {
                        const bookedStartTime = new Date(time.startTime)
                          .toISOString()
                          .slice(0, 16);
                        const bookedEndTime = new Date(time.endTime)
                          .toISOString()
                          .slice(0, 16);
                        return (
                          startTime >= bookedStartTime &&
                          startTime < bookedEndTime
                        );
                      })}
                    />
                  </div>

                  {/* Input end */}
                  <div className="mb-4">
                    <label
                      htmlFor="end_time"
                      className="block font-semibold mb-1"
                    >
                      End:
                    </label>
                    <input
                      type="datetime-local"
                      id="end_time"
                      name="end_time"
                      className="w-full border-gray-300 rounded-lg px-4 py-2"
                      onChange={(e) => setEndTime(e.target.value)}
                      disabled={bookedTimes.some((time) => {
                        const bookedStartTime = new Date(time.startTime)
                          .toISOString()
                          .slice(0, 16);
                        const bookedEndTime = new Date(time.endTime)
                          .toISOString()
                          .slice(0, 16);
                        return (
                          endTime > bookedStartTime && endTime <= bookedEndTime
                        );
                      })}
                    />
                  </div>

                  {/* Input reason */}
                  <div className="mb-4">
                    <label
                      htmlFor="reason"
                      className="block font-semibold mb-1"
                    >
                      Reason:
                    </label>
                    <input
                      type="text"
                      id="reason"
                      name="reason"
                      className="w-full border-gray-300 rounded-lg px-4 py-2"
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>

                  {/* Tambahkan input lainnya sesuai kebutuhan */}
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="bg-red-800 text-white px-4 py-2 rounded-lg mr-2 justify-end"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg justify-end"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="mx-auto sm:mb-0 mb-10">
            <h1 className="sm:text-xl text-center text-lg">
              Which room do you want to book now?
            </h1>
            <input
              type="text"
              className="text-sm outline-none mx-auto flex sm:w-96 h-7 shadow-xl drop-shadow-2xl rounded-xl my-3 px-3"
            />
            <h1 className="text-2xl text-center mt-10">Discover Room</h1>
          </div>
          {showSlide && (
            // <Swiper
            //   slidesPerView={4}
            //   spaceBetween={5}
            //   pagination={{
            //     clickable: true,
            //   }}
            //   modules={[Pagination]}
            //   className="mySwiper "
            // >
            <div className="mx-40 mt-16">
              {rooms.map(
                (room, index) =>
                  index % 4 === 0 && (
                    <div
                      key={`row_${index}`}
                      className="sm:grid grid-cols-4 gap-5"
                    >
                      {rooms.slice(index, index + 4).map((roomItem) => (
                        <div
                          key={roomItem.id}
                          className="grid px-4 py-4 rounded-xl space-y-2 scale-95 shadow-2xl sm:h-80"
                        >
                          <div>
                            <img
                              src={`http://localhost/Kingrooms/public/storage/rooms/${roomItem.image_room}`}
                              alt=""
                              className="w-full h-32 rounded-xl bg-slate-100 object-contain"
                            />
                          </div>
                          <div>
                            <h1>{roomItem.name_room}</h1>
                          </div>
                          <div>
                            <p>{roomItem.description_room}</p>
                          </div>
                          <div className="flex mx-auto">
                            {roomItem.status === 2 ? (
                              <button
                                className="bg-red-800 px-20 py-1 rounded-xl text-white"
                                onClick={() => handleBookingClick(roomItem.id)}
                              >
                                Booking
                              </button>
                            ) : (
                              <button
                                className="bg-red-800 px-20 py-1 rounded-xl text-white"
                                onClick={() => handleBookingClick(roomItem.id)}
                              >
                                Booked
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
              )}
            </div>

            // </Swiper>
          )}

          <div className="sm:grid grid-cols-4 hidden mx-40 gap-5 mt-16">
            {rooms.map((room) => (
              <div
                className="grid px-4 py-4 rounded-xl space-y-2 shadow-2xl sm:h-80"
                key={room.id}
              >
                <div>
                  <img
                    src={`http://localhost/Kingrooms/public/storage/rooms/${room.image_room}`}
                    alt=""
                    className="w-full h-32 rounded-xl bg-slate-100 object-contain"
                  />
                </div>
                <div>
                  <h1>{room.name_room}</h1>
                </div>
                <div>
                  <p>{room.description_room}</p>
                </div>
                <div className="flex mx-auto">
                  {room.status_room === "1" ? (
                    <button
                      className="bg-red-800 px-20 py-1 rounded-xl text-white"
                      onClick={() => handleBookingClick(room.id)}
                    >
                      Booking
                    </button>
                  ) : (
                    <button
                      className="bg-red-950 px-20 py-1 rounded-xl text-white"
                      // onClick={() => handleBookingClick(room.id)}
                    >
                      Booked
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {showSwiper && (
            <Swiper
              spaceBetween={30}
              pagination={true}
              modules={[Pagination]}
              className="mySwiper shadow-2xl scale-95 sm:hidden"
            >
              {rooms.map((room) => (
                <SwiperSlide className="sm:hidden" key={room.id}>
                  <div className="grid px-4 py-7 border-slate-700 rounded-xl space-y-2 shadow-2xl h-96 over sm:h-auto">
                    <div>
                      <img
                        src={`http://localhost/Kingrooms/public/storage/rooms/${room.image_room}`}
                        alt=""
                        className="w-full h-40 rounded-xl bg-slate-100 object-contain"
                      />
                    </div>
                    <div>
                      <h1>{room.name_room}</h1>
                    </div>
                    <div className="overflow-y-auto">
                      <p>{room.description_room}</p>
                    </div>
                    <div className="flex mx-auto">
                      {room.status_room === "1" ? (
                        <button
                          className="bg-red-800 px-20 py-1 rounded-xl text-white"
                          onClick={() => handleBookingClick(room.id)}
                        >
                          Booking
                        </button>
                      ) : (
                        <button
                          className="bg-red-950 px-20 py-1 rounded-xl text-white"
                          // onClick={() => handleBookingClick(room.id)}
                        >
                          Booked
                        </button>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <button onClick={click} className="px-5 py-1  pt-10">
            <h1 className="shadow-xl text-white w-32 mx-auto text-xl rounded-2xl bg-red-800 sm:grid hidden">
              Show All
            </h1>
          </button>
        </div>
      </section>
      <section id="room" className=" sm:mb-40 sm:mt-0 sm:pt-36 pt-20">
        <div className="grid sm:grid-cols-2 px-7 sm:px-32 space-y-16 sm:space-y-0">
          <div
            className="grid space-y-14 px-5 py-6 sm:space-y-20 sm:mr-20 rounded-2xl"
            style={{
              background:
                " linear-gradient(93.26deg, #BC4141 10.4%, #42408E 101.06%),linear-gradient(0deg, #E9DEFF, #E9DEFF)",
            }}
          >
            <h1 className="text-3xl text-white">Why?</h1>
            <p className="text-lg sm:text-base text-white">
              This website is specially made from student, for student. We
              notices that it is hard for the student to book a room at SMKN 1
              CIOMAS. and so, Kingroom is here to help you
            </p>
          </div>
          <div
            className="grid space-y-14 px-5 py-6 sm:space-y-20 sm:ml-16 rounded-2xl"
            style={{
              background:
                " linear-gradient(93.26deg, #BC4141 10.4%, #42408E 101.06%),linear-gradient(0deg, #E9DEFF, #E9DEFF)",
            }}
          >
            <h1 className="text-3xl text-white">What’s so good about it?</h1>
            <p className="text-lg sm:text-base text-white">
              With this, you can book any room that’s available to book even
              more easier. Not to mention, you can do it at all times. That’s
              why, kingroom is the most effective choice for you.
            </p>
          </div>
        </div>
      </section>
      <section id="history" className="mb-10 sm:px-24 sm:mb-40 mt-0 pt-24 ">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <th className="px-6 py-4 whitespace-nowrap text-left">
                Booking Start
              </th>
              <th className="px-6 py-4 whitespace-nowrap text-left">
                Booking Finish
              </th>
              <th className="px-6 py-4 whitespace-nowrap text-left">Reason</th>
              <th className="px-6 py-4 whitespace-nowrap text-left">
                Tanggal Booking
              </th>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr className="" key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.start_time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.end_time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.room.name_room}
                  </td>
                  {/* Tambahkan lebih banyak data sesuai kebutuhan */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section
        id="history"
        className="sm:px-24 pb-6 pt-6"
        style={{
          background: "linear-gradient(180deg, #2F2D82 25.1%, #BC4141 100%)",
        }}
      >
        <div className="grid grid-cols-4 gap-y-4 sm:gap-y-0 px-5">
          <div className="col-span-4 sm:col-span-1">
            <div className="flex items-center">
              <img src={logo} alt="" className="scale-150 flex" />
              <h1 className="text-3xl font-semibold  text-white">KingRoom</h1>
            </div>
          </div>
          <div className="block space-y-2">
            <h1 className="sm:text-lg text-white">Dashboard</h1>
            <h1 className="sm:text-lg  text-white">About Us</h1>
            <h1 className="sm:text-lg  text-white">Tutorial</h1>
            <h1 className="sm:text-lg  text-white">Log In</h1>
          </div>
          <div className="block space-y-2 col-span-2 sm:col-span-1">
            <h1 className="sm:text-lg text-center sm:text-left text-white">
              Contact Us
            </h1>
            <div className="flex space-x-1">
              <img src={uhuy} alt="" />
              <h1 className="sm:text-lg  text-white">SMKN 1 CIOMAS</h1>
            </div>
            <div className="flex space-x-1">
              <img src={p} alt="" />
              <h1 className="sm:text-lg  text-white">083819279366</h1>
            </div>
            <div className="flex space-x-1">
              <img src={m} alt="" />
              <h1 className="sm:text-lg  text-white">mamah@gmail.com</h1>
            </div>
          </div>
          <div className="block space-y-2">
            <h1 className="sm:text-lg  text-white">SocialMedia</h1>
            <div className="flex sm:space-x-3 space-x-1">
              <img src={facebook} alt="" />
              <img src={pinterest} alt="" />
              <img src={shape} alt="" />
              <img src={linked} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

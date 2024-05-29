import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { fetchRooms,deleteRoom } from "../api/Api"; // Import fungsi fetchRooms dari api.js
import Sidebar from "../components/Sidebar";
import NavLink from "@/components/NavLink";
import Api from "../api/Api";
import {
  MenuIcon,
  LogoutIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

export default function Room() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const navigate = useNavigate();
  const [editingRoom, setEditingRoom] = useState(null);
  const [rooms, setRooms] = useState([]); // State untuk menyimpan data ruangan
  const [showOptions, setShowOptions] = useState([]);
  const toggleOptions = (index) => {
    const newShowOptions = [...showOptions];
    newShowOptions[index] = !newShowOptions[index];
    setShowOptions(newShowOptions);
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData = await fetchRooms();
        console.log("Room data:", roomData); // Log roomData untuk memeriksa strukturnya
        setRooms(roomData);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        // Penanganan kesalahan pengambilan ruangan
      }
    };

    fetchRoomData(); // Panggil fungsi fetchRoomData saat komponen dimount
  }, []);

  const handleEditClick = (roomId) => {
    const selectedRoom = rooms.find((room) => room.id === roomId);
    setSelectedRoomId(roomId);
    setEditingRoom(selectedRoom);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Periksa ketersediaan token autentikasi
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Arahkan pengguna ke halaman login jika token tidak tersedia
    }
  }, [navigate]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditingRoom({
      ...editingRoom,
      [name]: value,
    });
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingRoom({
          ...editingRoom,
          image_room: reader.result, // Menyimpan gambar dalam bentuk base64
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name_room", editingRoom.name_room);
      formData.append("image_room", editingRoom.image_room);
      formData.append("description_room", editingRoom.description_room);
      formData.append("slug", editingRoom.slug);
      formData.append("status", editingRoom.status_room);

      const response = await Api.put(`/api/admin/rooms/${editingRoom.id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        console.log("Room updated successfully!");
        const updatedRooms = await fetchRooms();
        setRooms(updatedRooms);
        setSelectedRoomId(null);
        setEditingRoom(null);
      } else {
        console.error("Error updating room:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };
  const handleDeleteClick = async (roomId) => {
    try {
      await deleteRoom(roomId);
      const updatedRooms = await fetchRooms();
      setRooms(updatedRooms);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };


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
          <section className="flex-grow relative w-96 overflow-x-auto sm:w-auto">
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
            {/* Tabel ruangan */}

            <div className="relative shadow-xl sm:rounded-lg mx-5 my-6 overflow-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name Room
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image Room
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description Room
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Slug
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status Room
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room, index) => (
                    <tr
                      key={room.id}
                      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {room.name_room}
                      </th>
                      <td className="px-6 py-4">
                        <img
                          src={`http://localhost/Kingrooms/public/storage/rooms/${room.image_room}`}
                        />
                      </td>
                      <td className="px-6 py-4">{room.description_room}</td>
                      <td className="px-6 py-4">{room.slug}</td>
                      <td className="px-6 py-4">{room.status_room}</td>
                      <td className="px-6 py-4 text-right relative">
                        <button onClick={() => toggleOptions(index)}>
                          <DotsHorizontalIcon className="w-6 h-6" />
                        </button>
                        {showOptions[index] && (
                          <div className="absolute right-3 grid bg-white shadow-md p-2 mt-1 rounded z-20">
                            <button onClick={() => handleEditClick(room.id)}>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(room.id)}
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
      {selectedRoomId && editingRoom && (
        <EditRoomForm
          room={editingRoom}
          onChange={handleFormChange}
          onChangeImage={onChangeImage} // Sertakan fungsi onChangeImage untuk menangani perubahan gambar
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}

function EditRoomForm({ room, onChange, onChangeImage, onSubmit }) {
  const [nameRoom, setNameRoom] = useState(room.name_room);
  const [descriptionRoom, setDescriptionRoom] = useState(room.description_room);
  const [slug, setSlug] = useState(room.slug);
  const [statusRoom, setStatusRoom] = useState(room.status_room);
  const [errors, setErrors] = useState([]);

  // Menggunakan useEffect untuk mengatur nilai awal imageRoom
  useEffect(() => {
    // Check jika room.image_room tidak kosong
    if (room.image_room) {
      // Set nilai imageRoom dengan base64 dari room.image_room
      setImageRoom(`data:image/jpeg;base64,${room.image_room}`);
    }
  }, [room.image_room]);

  const [imageRoom, setImageRoom] = useState("");

  const { id } = useParams();
  const handleFileChange = (e) => {
    onChangeImage(e); // Memanggil fungsi onChangeImage yang diterima dari props
    setImageRoom(URL.createObjectURL(e.target.files[0])); // Menampilkan gambar yang akan diupload
  };
  const navigate = useNavigate();
  const updatePost = async (e) => {
    e.preventDefault();

    //init FormData
    const formData = new FormData();

    //append data
    formData.append("image_room", imageRoom);
    formData.append("name_room", nameRoom);
    formData.append("description_room", descriptionRoom);
    formData.append("status_room", statusRoom);
    formData.append("_method", "PUT");

    //send data with API
    await Api.post(`/api/admin/rooms/${id}`, formData)
      .then(() => {
        //redirect to posts index
        navigate("/posts");
      })
      .catch((error) => {
        //set errors response to state "errors"
        setErrors(error.response.data);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-20">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit Booking</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name_room"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name Room
            </label>
            <input
              type="text"
              id="name_room"
              name="name_room"
              value={nameRoom}
              onChange={(e) => {
                setNameRoom(e.target.value);
                onChange(e); // Memanggil fungsi onChange yang diterima dari props
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="image_room"
              className="block text-gray-700 font-semibold mb-2"
            >
              Image Room
            </label>
            <input
              type="file"
              id="image_room"
              name="image_room"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            
              <img src={`http://localhost/Kingrooms/public/storage/rooms/${imageRoom}`} alt="Room" className="w-40 h-40 mt-2" />
        
            <label
              htmlFor="description_room"
              className="block text-gray-700 font-semibold mb-2"
            >
              Description Room
            </label>
            <input
              type="text"
              id="description_room"
              name="description_room"
              value={descriptionRoom}
              onChange={(e) => {
                setDescriptionRoom(e.target.value);
                onChange(e); // Memanggil fungsi onChange yang diterima dari props
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <label
              htmlFor="slug"
              className="block text-gray-700 font-semibold mb-2"
            >
              Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                onChange(e); // Memanggil fungsi onChange yang diterima dari props
              }}
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
              value={statusRoom}
              onChange={(e) => {
                setStatusRoom(e.target.value);
                onChange(e); // Memanggil fungsi onChange yang diterima dari props
              }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              onChange={updatePost}
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
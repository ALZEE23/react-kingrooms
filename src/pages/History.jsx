
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../api/Api";
import Sidebar from "../components/Sidebar";

export default function History() {
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
    <>
      <div className="flex">
        {" "}
        {/* Menggunakan flex container */}
        <Sidebar />
        <div className="flex flex-col flex-grow">
          {" "}
          {/* Menggunakan flex untuk menyesuaikan tinggi */}
          <nav className="sm:hidden w-full h-16 bg-slate-500 px-5 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 ml-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </nav>
          <section className="flex-grow relative">
            {" "}
            {/* Menggunakan flex-grow untuk memungkinkan konten untuk menempati ruang yang tersisa */}
            <div className="flex px-3 sm:px-5">
              <div>
                <div className="mx-auto mt-10 flex">
                  
                </div>
                <div className="flex mx-auto">
                  <img
                    src={""}
                    alt=""
                    className=" scale-50 sm:scale-75 mx-auto"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

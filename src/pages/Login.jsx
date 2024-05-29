import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import siku from "../assets/Vector 2 (1).svg";
import oi from "../assets/SIGNUP PAGE.svg";
import {
  ArrowLeftIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from "@radix-ui/react-icons";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  
  document.title = "Login - Kingroom";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(email, password);

      Cookies.set("token", response.token, { expires: 7 });
      Cookies.set("user", JSON.stringify(response.user), { expires: 7 });
      Cookies.set("permissions", JSON.stringify(response.permission), {
        expires: 7,
      });

      // Simpan user id di localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.user.id);
      console.log(response.user.id);
      toast.success("Login Successfully!", {
        position: "top-right",
        duration: 4000,
      });

      localStorage.setItem("permission", response.permission);
      console.log(response.permission);

      if (response.permission["users.index"]) {
        navigate("/dashboard");
      } else {
        navigate("/home/#booking");
      }
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      } else {
        console.error("An error occurred:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const back = async () => {
    navigate("/");
  };

  // useEffect(() => {
  //   const token = JSON.parse(Cookies.get("token"));
  //   if (token) {
  //     console.log(token);
  //   }
  // }, []);

  // useEffect(() => {
  //   const token = JSON.parse(Cookies.get("token"));
  //   if (token) {
  //     // navigate("/home");
  //   }
  // }, []); // <-- Empty dependency array to ensure the effect runs only once

  return (
    <>
      <section className="px-6 pt-10 w-full h-full overflow-x-hidden overflow-y-hidden oi sm:bg-cover sm:h-[100vh]">
        <div className="relative mb-[5rem] sm:hidden">
          <img
            src={siku}
            alt=""
            className="absolute -z-10 scale-150 -top-[3.5rem] sm:right-1 hidden"
          />
        </div>
        <div className="grid space-y-8 border px-6 pt-5 pb-32 shadow-xl z-20 bg-white scale-90 sm:w-[27rem] sm:ml-20 sm:scale-100 sm:px-10 sm:relative sm:mt-24">
          <h2 className="mx-auto text-4xl font-bold">Login</h2>
          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex"></div>
            <div className="grid space-y-2">
              <label className="text-2xl font-semibold ">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-xl border-slate-800 px-2 py-2 text-xl"
                placeholder="Email"
              />
            </div>
            <div className="grid space-y-2">
              <label className="text-2xl font-semibold">Password:</label>
              <div className="flex border border-slate-800 rounded-xl">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  className="px-2 py-2 text-xl rounded-xl border-none outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="mx-auto"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOpenIcon className="scale-150" />
                  ) : (
                    <EyeClosedIcon className="scale-150" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="text-xl border px-2 py-2 rounded-xl text-white bg-red-700"
            >
              Login
            </button>
          </form>
          <div className="absolute bottom-6 left-6">
            <button onClick={back}>
              {" "}
              <div className="flex ">
                <ArrowLeftIcon className="scale-150" />
              </div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

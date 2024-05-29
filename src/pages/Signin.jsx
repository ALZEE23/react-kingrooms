//import useState from react
import { useState, useEffect } from "react";

//import API
import Api from "../api/Api";

//import js cookie
import Cookies from "js-cookie";

//import react router dom
import { useNavigate } from "react-router-dom";

//import toast
import toast from "react-hot-toast";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState(""); // Add state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  document.title = "Register - SIPIKET";

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await Api.post("/api/public/register", {
        name: name, // Include name in registration data
        email: email,
        password: password,
      });

      Cookies.set("token", response.data.token);
      Cookies.set("user", JSON.stringify(response.data.user));
      Cookies.set("permissions", JSON.stringify(response.data.permissions));

      toast.success("Registration Successful!", {
        position: "top-right",
        duration: 4000,
      });

      navigate("/dashboard");
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

  return (
    <>
      <section className="px-6 pt-32">
        <div className="grid space-y-8 border px-6 pt-5 pb-32 shadow-xl">
          <h2 className="mx-auto text-4xl">Register</h2>
          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
          <form onSubmit={register} className="space-y-6">
            <div className="grid space-y-2">
              <label className="text-2xl">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-xl border-slate-800 px-2 py-2 text-xl"
                placeholder="Name"
              />
            </div>
            <div className="grid space-y-2">
              <label className="text-2xl">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-xl border-slate-800 px-2 py-2 text-xl"
                placeholder="Email"
              />
            </div>
            <div className="grid space-y-2">
              <label className="text-2xl">Password:</label>
              <div className="flex border border-slate-800 rounded-xl">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  className="px-2 py-2 text-xl rounded-xl border-none outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className=""
                  onClick={() => setShowPassword(!showPassword)}
                >
                  Show
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="text-xl border px-2 py-2 rounded-xl bg-red-400"
            >
              Register
            </button>{" "}
          </form>
        </div>
      </section>
    </>
  );
}

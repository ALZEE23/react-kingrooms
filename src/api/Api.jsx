// api.js

import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://127.0.0.1:8000";

const Api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Function to set authentication token
const setAuthToken = (token) => {
  if (token) {
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token); // Menyimpan token di localStorage
  } else {
    delete Api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token"); // Menghapus token dari localStorage
  }
};

// Intercept response to handle authentication errors
Api.interceptors.request.use(
  (config) => {
    // Tambahkan Authorization Bearer (token JWT) jika tersedia
    const token = localStorage.getItem("token"); // Mengambil token dari localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export setAuthToken agar bisa diakses dari komponen lain
export { setAuthToken };

// Function to login
export const login = async (email, password) => {
  const response = await Api.post("/api/login", { email, password }).catch(
    (error) => {
      throw error;
    }
  );
  const { token } = response.data;

  setAuthToken(token);
  Cookies.set("token", token);
  Cookies.set("user", JSON.stringify(response.data.user));
  Cookies.set("permissions", JSON.stringify(response.data.permissions));
  return response.data;
};

// Function to fetch rooms
export const fetchRooms = async () => {
  const response = await Api.get("/api/public/rooms");
  return response.data.data.data;
};
export const fetchDashboard = async () => {
  const response = await Api.get("/api/admin/dashboard");
  return response.data.data;
};

export const fetchUser = async () => {
  const response = await Api.get("/api/admin/users");
  return response.data.data.data;
};

export const fetchBookings = async () => {
  const response = await Api.get("/api/admin/bookings");
  return response.data.data.data;
};
export const fetchBookingUser = async () => {
  const response = await Api.get("/api/public/booking");
  return response.data.data.data;
};

export const fetchHistory = async () => {
  const response = await Api.get("/api/public/history");
  return response.data.data.data;
};

// Function to logout
export const logout = async () => {
  await Api.post("/api/logout").catch((error) => {
    throw error;
  });
  Cookies.remove("token");
  Cookies.remove("user");
  Cookies.remove("permissions");
  window.location = "/login";
};

export const deleteRoom = async (roomId) => {
  await Api.delete(`/api/admin/rooms/${roomId}`).catch((error) => {
    throw error;
  });
};
export const deleteBooking = async (roomId) => {
  await Api.delete(`/api/admin/bookings/${roomId}`).catch((error) => {
    throw error;
  });
};

export default Api;

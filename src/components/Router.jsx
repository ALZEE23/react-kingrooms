import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

const Login = lazy(() => import("../pages/Login.jsx"));
const Dashboard = lazy(() => import("../pages/Dashboard.jsx"));
const Booking = lazy(() => import("../pages/Booking.jsx"));
const History = lazy(() => import("../pages/History.jsx"));
const User = lazy(() => import("../pages/User.jsx"));
const Index = lazy(() => import("../pages/Index.jsx"));
const Home = lazy(() => import("../pages/Home.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));
const Room = lazy(() => import("../pages/Room.jsx"));

const Test = lazy(() => import("../test"));

export default function RoutesIndex() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/booking"
          element={
            <PrivateRoutes>
              <Booking />
            </PrivateRoutes>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoutes>
              <History />
            </PrivateRoutes>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoutes>
              <User />
            </PrivateRoutes>
          }
        />
        <Route
          path="/room"
          element={
            <PrivateRoutes>
              <Room />
            </PrivateRoutes>
          }
        />
      </Routes>
    </Suspense>
  );
}

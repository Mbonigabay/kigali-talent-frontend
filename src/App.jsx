import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./views/HomePage.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import VerifyAccount from "./views/VerifyAccount.jsx";
import JobDetails from "./views/JobDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import JobsDashboard from "./views/adminDashboard/JobsDashboard.jsx";
import CompaniesDashboard from "./views/adminDashboard/CompaniesDashboard.jsx";
import UsersDashboard from "./views/adminDashboard/UsersDashboard.jsx";
import Profile from "./views/userDasboard/Profile.jsx";
import Education from "./views/userDasboard/Education.jsx";
import Experience from "./views/userDasboard/Experience.jsx";
import Applications from "./views/userDasboard/Applications.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import UserLayout from "./layout/UserLayout.jsx";
import ApplicationsDashboard from "./views/adminDashboard/ApplicationsDashboard.jsx";

// The main App component that sets up the router.
export default function App() {
  return (
    <BrowserRouter>
      {/* Bootstrap 5 CSS link */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossOrigin="anonymous"
      ></link>
      {/* Navigation Bar */}
      <Navbar />

      {/* Define the routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/jobs/:slug" element={<JobDetails />} />

        {/* Admin routes, protected and nested within the AdminLayout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="jobs" element={<JobsDashboard />} />
          <Route path="applications" element={<ApplicationsDashboard />} />
          <Route path="companies" element={<CompaniesDashboard />} />
          <Route path="users" element={<UsersDashboard />} />
          <Route index element={<JobsDashboard />} />
        </Route>

        {/* User routes, protected and nested within the UserLayout */}
        <Route path="/user" element={
            <ProtectedRoute>
                <UserLayout />
            </ProtectedRoute>
        }>
            <Route path="profile" element={<Profile />} />
            <Route path="education" element={<Education />} />
            <Route path="experience" element={<Experience />} />
            <Route path="applications" element={<Applications />} />
            <Route index element={<Profile />} />
        </Route>

        {/* Fallback route for 404 Not Found pages */}
        <Route
          path="*"
          element={
            <h1 className="text-center mt-10 text-3xl font-bold text-red-600">
              404: Not Found
            </h1>
          }
        />
      </Routes>

      <Footer />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q"
        crossorigin="anonymous"
      ></script>
    </BrowserRouter>
  );
}

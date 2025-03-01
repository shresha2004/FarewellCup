import React, { forwardRef, useState } from "react";
import api from "../utils/api";

const AdminLogin = forwardRef(({ setIsAdmin }, ref) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  localStorage.setItem("isAdmin", "false");

  const handleLogin = async () => {
    try {
      const response = await api.post("admin/login", {
        id,
        password,
      });
      const data = response.data;

      if (data.success) {
        setIsAdmin(true);
        alert("Login successful!");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div ref={ref} className="flex items-center justify-center min-h-screen bg-[#1B1B2F]">
      <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-2xl p-8 w-96 border border-white/20">
        <h2 className="text-3xl font-bold mb-4 text-center">Organizer Login</h2>
        <p className="text-sm text-center text-gray-300 mb-6">
          (For Organizers Only)
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter ID"
            className="p-3 w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#802BB1] transition"
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="p-3 w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#802BB1] transition"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </div>

        <button
          className="mt-6 bg-[#802BB1] text-white px-4 py-3 w-full rounded-lg font-semibold hover:bg-[#6a2395] transition duration-300 ease-in-out transform hover:scale-105"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
});

export default AdminLogin;

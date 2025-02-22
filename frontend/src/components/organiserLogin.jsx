import React, { forwardRef, useState } from "react";
import api from "../utils/api"

const AdminLogin = forwardRef(({ setIsAdmin }, ref) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  localStorage.setItem('isAdmin','false');

  const handleLogin = async () => {
    try {
      const response = await api.post("admin/login", {
        id,
        password,
      });
      const data = response.data;
  
      if (data.success) {
        setIsAdmin(true);
       // localStorage.setItem("isAdmin", "true");
        alert("Login success");
      } else {
        setError("Invalid credentials");
        alert("Failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
      alert("Failed");
    }
  };
  

  return (
    <div ref={ref} className="flex items-center justify-center  bg-[#2D283E]">
      <div className="bg-white text-[#2D283E] rounded-xl shadow-lg p-6 w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Organizer Login</h2>
        <p className="text-sm text-center text-gray-600 mb-2">
          (For Organizers Only)
        </p>
        <input
          type="text"
          placeholder="Enter ID"
          className="p-2 mb-3 w-full border border-gray-300 rounded"
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="p-2 mb-3 w-full border border-gray-300 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          className="bg-[#802BB1] text-white px-4 py-2 w-full rounded hover:bg-[#6a2395]"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
});

export default AdminLogin;

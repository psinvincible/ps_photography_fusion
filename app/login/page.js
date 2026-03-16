"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLoginPage = () => {
  const router = useRouter();
  const { fetchUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      await fetchUser();
      toast.success("Login Success");

      router.push("/admin/dashboard");
    } else {
      toast.error("Invalid Credentials!");
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <h1 className="absolute text-[21vw]  sm:text-[25] md:text-[20] font-extrabold text-white/15 select-none pointer-events-none leading-none">
        NATURE
      </h1>

      <div className="inset-0 absolute bg-black/60"></div>

      <div className="relative backdrop-blur-none bg-white/10 border border-white/20 rounded-2xl p-8 w-[90%] max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            disabled={loading}
            placeholder="Email"
            className="w-full p-3 mb-4 bg-black/50 border border-white/20 rounded focus:outline-none"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <div className="relative w-full mb-4">
            <input
              placeholder="Password"
              disabled={loading}
              type={showPassword ? "text" : "password"}
              className="w-full p-3 pr-10 bg-black/50 border border-white/20 rounded focus:outline-none"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded font-semibold hover:bg-gray-200 transition flex justify-center items-center"
          >
            {loading ? (
              <span className="inline-block animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;

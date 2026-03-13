"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MdDashboard,
  MdPhoto,
  MdStar,
  MdMail,
  MdPerson,
  MdLogout,
  MdMenu,
  MdMessage
} from "react-icons/md";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", Icon: MdDashboard },
    { href: "/admin/photos", label: "Photos", Icon: MdPhoto },
    { href: "/admin/featured", label: "Featured", Icon: MdStar },
    { href: "/admin/wishes", label: "Public Wishes", Icon: MdMail },
    { href: "/admin/messages", label: "Messages", Icon: MdMessage },
    // { href: "/admin/profile", label: "Profile", Icon: MdPerson },
  ];

  const handleLogout = () => {
    setShowLogoutPopup(true);

    setTimeout(() => {
      logout();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <nav className="w-full bg-black border-b border-white/10 flex items-center justify-between px-4 py-3">
        <div className="font-bold text-lg">Admin Panel</div>

        <div className="hidden md:flex gap-2">
          {navLinks.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ${pathname === href ? "bg-white text-black" : "hover:bg-white/20 text-gray-300"}`}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
          <button
            className="bg-red-500 px-3 py-2 rounded flex items-center gap-2 ml-2 hover:bg-red-600 transition-colors"
            onClick={handleLogout}
          >
            <MdLogout size={20} />
            Logout
          </button>
        </div>

        <button
          className="md:hidden border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <MdMenu size={26} />
        </button>
      </nav>

      {open && (
        <div className="md:hidden fixed top-14 left-0 w-full bg-black border-b border-white/10 flex flex-col gap-2 px-4 py-3 z-30 shadow-lg">
          {navLinks.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 ${pathname === href ? "bg-white text-black" : "hover:bg-white/20 text-gray-300"}`}
            >
              <Icon size={20} />
              {label}
            </Link>
          ))}
          <button
            className="bg-red-500 px-3 py-2 rounded flex items-center gap-2 mt-2 hover:bg-red-600 transition-colors"
            onClick={handleLogout}
          >
            <MdLogout size={20} />
            Logout
          </button>
        </div>
      )}

      <div className="flex-1 ">{children}</div>

      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          {/* Floating leaves */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <span className="leaf leaf1">🍃</span>
            <span className="leaf leaf2">🌿</span>
            <span className="leaf leaf3">🍃</span>
            <span className="leaf leaf4">🌱</span>
          </div>

          {/* Modal */}
          <div className="relative bg-gradient-to-br from-green-200 to-green-400 text-green-900 px-10 py-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-fadeIn">
            {/* Ripple circle */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-16 h-16 rounded-full bg-green-500/40 animate-ping"></div>
              <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl">
                🌿
              </div>
            </div>

            <p className="text-lg font-semibold">Logging out...</p>
            <p className="text-sm opacity-70">Saving your garden 🌱</p>
          </div>
        </div>
      )}
    </div>
  );
}

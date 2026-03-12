"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (href, label) => (
    <Link
      href={href}
      onClick={() => setMenuOpen(false)}
      className={`transition ${pathname === href ? "text-white" : "text-gray-400"} hover:text-white`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-lg">
          PS_Photography_Fusion
        </Link>

        {/* desktop screen view */}
        <div className="hidden md:flex gap-6 text-sm items-center">
          {navLink("/", "Home")}
          {navLink("/explore", "Explore")}
          {navLink("/featured", "Featured Section")}
          {navLink("/about", "About")}
          {navLink("/contact", "Contact")}

          <Link href="/login">
            <MdAccountCircle size={22} />
          </Link>
        </div>

        {/* mobile screen view */}

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur">
          <div className="flex flex-col items-center gap-6 py-6 text-sm">
            {navLink("/", "Home")}
            {navLink("/explore", "Explore")}
            {navLink("/featured", "Featured Section")}
            {navLink("/about", "About")}
            {navLink("/contact", "Contact")}

            <Link href="/login">
              <MdAccountCircle size={22} onClick={() => setMenuOpen(false)} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

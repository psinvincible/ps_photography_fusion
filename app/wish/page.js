"use client";

import { useState } from "react";

export default function Wish() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
    imageUrl: "",
    link: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/wish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Your wish has been submitted Successfully.");

    setForm({
      name: "",
      email: "",
      title: "",
      message: "",
      imageUrl: "",
      link: "",
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full space-y-4 bg-white/5 border border-white/10 p-6 rounded-xl"
      >
        <h1 className="text-2xl font-bold">Submit a Wish</h1>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full p-2 bg-black border  border-white/20 rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="example@email.com"
          onChange={handleChange}
          className="w-full p-2 bg-black border  border-white/20 rounded"
        />

        <input
          name="title"
          type="text"
          placeholder="Title"
          onChange={handleChange}
          className="w-full p-2 bg-black border  border-white/20 rounded"
        />

        <textarea
          name="message"
          type="text"
          placeholder="Your Message"
          onChange={handleChange}
          className="w-full p-2 bg-black border  border-white/20 rounded"
        />

        <input
          name="imageUrl"
          type="text"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full p-2 bg-black border  border-white/20 rounded"
        />

        <input
          name="link"
          type="text"
          placeholder="Link (optional)"
          onChange={handleChange}
          className="w-full p-2 bg-black border  border-white/20 rounded"
        />

        <button
        className="w-full bg-white text-black py-2 rounded hover:bg-black hover:text-white"        
        >Submit Wish</button>
      </form>
    </div>
  );
}

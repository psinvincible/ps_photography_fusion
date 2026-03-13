"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Wish() {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    const res = await fetch("/api/wish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if(res.ok){
      toast.success("Your wish has been submitted Successfully.");
      setForm({
      name: "",
      email: "",
      title: "",
      message: "",
      imageUrl: "",
      link: "",
    });
    setLoading(false);

      return;
    }else {
      toast.error("Failed to submit wish!");
      setLoading(false);
      return;
    }

    
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full space-y-4 bg-white/5 border border-white/10 p-6 rounded-xl"
      >
        <h1 className="text-2xl font-bold">Submit a Wish</h1>

        <input
          disabled={loading}
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 bg-black border  border-white/20 rounded"
        />

        <input
          disabled={loading}
          name="email"
          type="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 bg-black border  border-white/20 rounded"
        />

        <input
          disabled={loading}
          name="title"
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 bg-black border  border-white/20 rounded"
        />

        <textarea
          disabled={loading}
          name="message"
          type="text"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full p-2 bg-black border  border-white/20 rounded"
        />

        <input
          disabled={loading}
          name="imageUrl"
          type="text"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full p-2 bg-black border  border-white/20 rounded"
        />

        <input
          disabled={loading}
          name="link"
          type="text"
          placeholder="Link (optional)"
          value={form.link}
          onChange={handleChange}
          className="w-full p-2 bg-black border  border-white/20 rounded"
        />

        <button
          disabled={loading}
        className="w-full bg-white text-black py-2 rounded hover:bg-black hover:text-white"        
        >{loading ? "Submitting Wish..." : "Submit Wish"}</button>
      </form>
    </div>
  );
}

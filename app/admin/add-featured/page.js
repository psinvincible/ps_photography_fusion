"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddFeatured() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    message: "",
    imageUrl: "",
    link: "",
    animation: "glow",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);

    const res = await fetch(`/api/featured`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 ">Add Featured Wish</h2>

      <form
        className="bg-white/10 p-6 shadow-md rounded-xl space-y-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-white/20"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            placeholder="Message"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            name="imageUrl"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Link (optional)
          </label>
          <input
            name="link"
            className="w-full rounded-lg px-3 py-2 border"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Animation</label>
          <select
            name="animation"
            placeholder="Animation"
            className="w-full border rounded-lg px-3 py-2 bg-black text-white"
            onChange={handleChange}
          >
            <option value="glow">Glow</option>
            <option value="pulse">Pulse</option>
            <option value="bounce">Bounce</option>
            <option value="none">None</option>
          </select>
        </div>

        <button className="w-full bg-white text-black py-2 rounded">
          Save Featured
        </button>
      </form>
    </div>
  );
}

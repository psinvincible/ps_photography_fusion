"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddFeatured() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    message: "",
    imageUrl: "",
    link: "",
    animation: "glow",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const res = await fetch(`/api/featured`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("New featured Added.")
      setLoading(false);
      router.push("/admin/dashboard");
      return;
    }else {
      toast.error("Something went wrong!");
      setLoading(false);
      return;
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
            disabled={loading}
            placeholder="Title"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-white/20"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            name="message"
            disabled={loading}
            placeholder="Message"
            className="w-full border rounded-lg px-3 py-2"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            name="imageUrl"
            disabled={loading}
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
            disabled={loading}
            className="w-full rounded-lg px-3 py-2 border"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Animation</label>
          <select
            name="animation"
            disabled={loading}
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

        <button className="w-full bg-white text-black py-2 rounded"
        disabled={loading}
        >
          {loading ? "Saving..." : "Save Featured"}
        </button>
      </form>
    </div>
  );
}

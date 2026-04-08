"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { categories } from '@/lib/assets';
import Select from "react-select"


const page = () => {
  const router = useRouter();
  const { id } = useParams();

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/068/667/990/large/please-wait-word-on-white-background-video.jpg",
    category: "",
    description: "",
    view: 0,
    createdAt: "",
    exif: {},
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setSaving(true);
    const res = await fetch(`/api/photos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("Saved changes");
      router.push("/admin/dashboard");
    } else {
      toast.error("Error editing photo!");
      setSaving(false);
    }
  };

  useEffect(() => {
    fetch(`/api/photos/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, [id]);

  const categoryOptions = categories.map((category) => ({
      label: category,
      value: category,
    }))

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-xl backdrop-blur">
            <img
              src={form?.imageUrl}
              alt="wait for the photo"
              className="w-full max-h-100 object-contain rounded-lg"
            />
          </div>

          <div className="bg-white/5 p-4 rounded-xl text-sm space-y-2">
            <p>Views: {form.views}</p>
            <p>
              Uploaded On: {form.createdAt
                ? new Date(form.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl text-sm space-y-2">
            <h3 className="font-semibold mb-2">Exif Info</h3>

            <p>Camera: {form.exif?.camera || "N/A"}</p>
            <p>ISO: {form.exif?.iso || "N/A"}</p>
            <p>Aperture: {form.exif?.aperture || "N/A"}</p>
            <p>Shutter: {form.exif?.shutter || "N/A"}</p>
            <p>Focal Length: {form.exif?.FocalLength || "N/A"}</p>
          </div>
        </div>

        <form
          onSubmit={handleUpdate}
          className="bg-white/10 p-6 rounded-xl space-y-4 backdrop-blur"
        >
          <h2 className=" text-2xl font-bold mb-2">Edit Photo</h2>

          <div>
            <label className="text-sm text-gray-400 ">Title</label>
            <input
              value={form.title}
              name="title"
              type="text"
              placeholder="Enter Title"
              className="w-full p-3 mt-1 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-white"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 ">Image URL</label>
            <input
              value={form.imageUrl}
              name="imageUrl"
              type="text"
              placeholder="Image URL"
              className="w-full p-3 mt-1 bg-black border border-white/20 rounded-lg cursor-not-allowed"
              disabled
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 ">Category</label>
            <Select 
              options={categoryOptions}
              
              value={categoryOptions.find(option =>  option.value === form.category)}
              onChange={(selected) => setForm({...form, category: selected.value})}
              isSearchable 
              placeholder="Select or Search category"
              className="w-full border rounded-lg text-black"
            />
            
          </div>

          <div>
            <label className="text-sm text-gray-400 ">Description</label>
            <textarea
              value={form.description}
              rows={4}
              name="description"
              placeholder="Write something..."
              className="w-full p-3 mt-1 bg-black border border-white/20 rounded-lg"
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 ">
            <button
              type="submit"
              className="flex-1 bg-white text-black py-3 rounded-lg hover:bg-gray-200 transition "
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/dashboard")}
              className="flex-1 border border-white py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;

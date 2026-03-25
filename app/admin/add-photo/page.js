"use client";

import exifr from "exifr";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const controllerRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    category: "",
    description: "",
    public_id: "",
    exif: {
      camera: "",
      iso: "",
      aperture: "",
      shutter: "",
      focalLength: "",
    }
  });
  const [image, setImage] = useState(null);
  const [exif, setExif] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("image not found!");
      return;
    }

    setUploading(true);

    const controller = new AbortController();
    controllerRef.current = controller;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      const data = await res.json();
      console.log("Uploaded ImageUrl:", data.url);
      console.log("Public id:", data.public_id);

      if (res.ok && data.url) {
        toast.success("image Upload success");
        setForm((prev) => ({
          ...prev,
          imageUrl: data.url,
          public_id: data.public_id,
        }));
      } else {
        toast.error("Upload failed!");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        toast.error("Upload Cancelled!");
      }
      setUploading(false);
    }
  };

  const cancelUpload = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      setUploading(false);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/photos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Photo Added");
      router.push("/admin/dashboard");
    } else {
      toast.error("Error adding photo!");
    }
  };

  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));

    try {
      const exifData = await exifr.parse(file);
      setExif(exifData);

      //setting exif data to form
      setForm((prev) => ({
        ...prev, 
        exif: {
          camera: exifData?.Model || "",
          iso: exifData?.ISO || "",
          aperture: exifData?.FNumber || "",
          shutter: exifData?.ExposureTime ? `1/${Math.round(1 / exifData.ExposureTime)}` : "",
          focalLength: exifData?.FocalLength || "",
        }
      }))
    } catch (error) {
      console.error("Exif parse error:", error);
      setExif(null);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    setExif(null);

    setForm((prev) => ({
      ...prev, 
      exif: {
        camera: "",
        iso: "",
        aperture: "",
        shutter: "",
        focalLength: "",
      }
    }))
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 p-6">
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className=" text-3xl font-bold mb-6">Add Photo</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 p-6 rounded-xl shadow-md space-y-5"
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
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              name="imageUrl"
              placeholder="Image URL"
              type="text"
              className="w-full border rounded-lg px-3 py-2 bg-black cursor-not-allowed"
              value={form.imageUrl}
              disabled
            />
          </div>

          <div>
            {!preview && (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-white/5 transition">
                <span className="text-sm text-gray-400 ">Click or drag image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                />
                </label>
            )}

            {preview && (
              <div className="relative group rounded-2xl overflow-hidden shadow-lg">
                <img src={preview} className="w-full h-87.5 object-cover transition-transform duration-300 group-hover:scale-105" />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3  right-2 bg-black/70 hover:bg-red-500 text-white px-3 py-1 rounded-lg text-sm transition"
                >
                  Remove Image
                </button>
              </div>
            )}

            {image && (
              <div>
                <button
                  onClick={handleImageUpload}
                  type="button"
                  className="px-5 py-2 rounded-xl bg-linear-to-r from-white to-gray-300 text-black font-medium shadow hover:scale-105 transition"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Photo"}
                </button>

                <button
                  onClick={cancelUpload}
                  type="button"
                  className="px-5 py-2 bg-red-500 text-white rounded-xl  shadow hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            )}

            {form.imageUrl && (
              <div>
                <img
                  src={form.imageUrl}
                  alt="preview"
                  className="w-40 h-40 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="w-full border rounded-lg px-3 py-2"
              onChange={handleChange}
            />
          </div>

          <button className="w-full bg-white text-black py-2 rounded ">
            Add Photo
          </button>
        </form>
      </div>

      {/* this is right side  */}
      <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Image Info</h2>

        {!exif && <p className="text-gray-400 text-sm">No image selected!</p>}

        {exif && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-gray-400">Camera</p>
              <p className="font-medium">{exif.Model || "N/A"}</p>
            </div>

            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-gray-400">ISO</p>
              <p className="font-medium">{exif.ISO || "N/A"}</p>
            </div>

            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-gray-400">Aperture</p>
              <p className="font-medium">Aperture: f/{exif.FNumber || "N/A"}</p>
            </div>

            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-gray-400">Aperture</p>
              <p>Shutter: {exif.ExposureTime ? `1/${Math.round(1 / exif.ExposureTime)}` : "N/A"}</p>
              <p>Focal Length: {exif.FocalLength || "N/A"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

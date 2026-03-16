"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AdminPhoto() {
  const [photos, setPhotos] = useState([]);
  const router = useRouter();

  const fetchPhotos = async () => {
    const res = await fetch("/api/admin/photos");
    const data = await res.json();
    setPhotos(data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this photo?",
    );
    if (!confirmDelete) return;

    await fetch(`/api/photos/${id}`, {
      method: "DELETE",
    });

    fetchPhotos();
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 ">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-xl md:text-3xl font-bold">Admin Photo Manage</h1>

        <div>
          <button
            onClick={() => router.push("/admin/add-photo")}
            className="bg-white text-black px-4 py-2 mx-1 rounded-lg "
          >
            + Add Photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="bg-white/10 rounded-xl overflow-hidden"
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-3">
              <h2 className="font-semibold">{photo.title}</h2>
              <p className="text-sm text-gray-400">{photo.category}</p>

              <div className="flex gap-2 mt-3 ">
                <button
                  onClick={() => router.push(`/admin/edit-photo/${photo._id}`)}
                  className="text-xs bg-blue-500 px-2 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(photo._id)}
                  className="text-xs bg-red-500 px-2 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {photos?.length === 0 && (
          <div>
            <h3>No messages to display!</h3>
          </div>
        )}
      </div>
    </div>
  );
}

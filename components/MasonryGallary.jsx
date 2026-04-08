"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Masonry from "react-masonry-css";
import PhotoModal from "./PhotoModal";

export default function MasonryGallary({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const breakpointsColumns = {
    default: 4,
    1200: 3,
    800: 2,
    500: 1,
  };

  const increaseView = async (id) => {
    const viewed = localStorage.getItem(`viewed_${id}`);
    if (viewed) {
      return;
    }

    const res = await fetch(`/api/photos/views/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      localStorage.setItem(`viewed_${id}`, "true");
      toast.success("View updated!");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {photos.length === 0 && (
        <p className="text-center text-gray-400 ">No photos found.</p>
      )}
      <Masonry
        breakpointCols={breakpointsColumns}
        className="flex gap-4"
        columnClassName="flex flex-col gap-4"
      >
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="overflow-hidden rounded-xl"
            onClick={() => {
              setSelectedPhoto(photo);
              increaseView(photo._id);
            }}
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full object-cover rounded-xl hover:scale-105 transition duration-300"
            ></img>
          </div>
        ))}
      </Masonry>

      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </>
  );
}

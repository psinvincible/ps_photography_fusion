"use client";

import { useEffect } from "react";

export default function PhotoModal({ photo, onClose }) {
  
useEffect(() => {
    if (!photo) return;

    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [photo]);
  
  if (!photo) {
    return;
  }


  return (
    <div className='fixed inset-0 bg-black/90 z-50 overflow-y-auto '
        onClick={onClose}
        >
          <div className='min-h-screen flex justify-center p-4'>
            <div className="max-w-5xl w-full my-10"
            onClick={(e) => e.stopPropagation()}>

            <img 
            src={photo.imageUrl}
            alt={photo.title}
            className='w-full max-h-[80vh] object-contain rounded-lg'
             />
             <h2 className="mt-4 text-4xl font-semibold text-white">{photo.title}</h2>
             <p className="text-gray-400">{photo.category || "General"}</p>
             <p className="text-gray-400">
               {new Date(photo.createdAt).toLocaleDateString()}
             </p>
             <p className="text-gray-400">{photo.views || 0} views</p>
             <p className='text-gray-400 mt-2'>{photo.description || "No description available"}</p>

          </div>
        </div>
      </div>
  );
}

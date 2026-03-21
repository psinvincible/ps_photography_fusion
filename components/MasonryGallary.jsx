"use client"

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Masonry from "react-masonry-css"

export default function MasonryGallary({photos}){
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const breakpointsColumns = {
        default: 4,
        1200: 3,
        800: 2,
        500: 1,
    }

        const increaseView = async(id) => {
            const viewed = localStorage.getItem(`viewed_${id}`);
            if(viewed){
                return;
            };

            const res = await fetch(`/api/photos/views/${id}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
            });

            if(res.ok){
                localStorage.setItem(`viewed_${id}`, "true");
                toast.success("View updated!");
            }else {
                toast.error("Something went wrong!");
            }
        }
    
    return (
        <>
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
                    }
                }
                >
                    <img 
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full object-cover rounded-xl hover:scale-105 transition duration-300"
                    ></img>
                </div>
            ))}
        </Masonry>

            {selectedPhoto && (
        <div className='fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4'
        onClick={() => setSelectedPhoto(null)}
        >
          <div className='max-w-5xl w-full'>
            <img 
            src={selectedPhoto.imageUrl}
            alt={selectedPhoto.title}
            className='w-full max-h-[80vh] object-contain rounded-lg'
             />
             <h2 className="mt-4 text-4xl font-semibold">{selectedPhoto.title}</h2>
             <p className='text-gray-400'>{selectedPhoto.description}</p>

          </div>
        </div>
      )}

        </>
    )
}   
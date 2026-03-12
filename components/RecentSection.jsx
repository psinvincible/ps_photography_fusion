"use client"
import React, { useEffect, useState } from 'react'

const RecentSection = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPhotos = async() => {
      const res = await fetch(`/api/photos`);
      const data = await res.json();
      console.log(data.photos);
      setPhotos(data.photos);
      setLoading(false);
    }
    fetchPhotos();
  }, [])
  
  return (
    <section className='max-w-6xl mx-auto px-4 pb-20'>
        <h2 className='text-2xl font-semibold mb-6'>Recent Shot...</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {loading ? Array.from({length: 6}).map((_, i) => (
            <div key={i} className='rounded-xl h-40 w-full bg-gray-300 animate-pulse'></div>
          )) : photos.map((photo) => (
            <img
            src={photo.imageUrl}
            key={photo._id}
            alt={photo.title}
            className='rounded-xl h-40 w-full object-cover hover:scale-105 transition'
            />
          ))}
        </div>
    </section>
  )
}

export default RecentSection;

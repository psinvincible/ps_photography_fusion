"use client"

import MasonryGallary from '@/components/MasonryGallary';
import React, { useCallback, useEffect, useRef, useState } from 'react'

const page = () => {
  
  const [photos, setPhotos] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);
  const fetchingRef = useRef(false);
  const initialLoadRef = useRef(false);

  

  const fetchPhotos = useCallback(async() => {

    if (fetchingRef.current || !hasMore) return;
    fetchingRef.current = true;

    try {
      const res = await fetch(`/api/photos?limit=6&skip=${skip}`);
      const data = await res.json();

      setPhotos((prev) => {
        const newIds = new Set(prev.map((p) => p._id));
        const filtered = data.photos.filter((p) => !newIds.has(p._id ));
        return [...prev, ...filtered];
      })

      setSkip((prev) => prev + data.photos.length);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
    fetchingRef.current = false;
  }, [skip, hasMore]);

  useEffect(() => {
    if(!initialLoadRef.current){
      initialLoadRef.current = true;
      fetchPhotos();
    }
  }, [fetchPhotos]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPhotos();
        }
      },
      { threshold: 0.5 }
    );
    const loader = loaderRef.current;
    if (loader) {
      observer.observe(loader);
    }
    return () => {
      if (loader) observer.unobserve(loader);
      observer.disconnect();
    };
  }, [fetchPhotos ,hasMore]);
  
  

  return (
    <div className='min-h-screen bg-black text-white px-4 md:px-10 py-14'>
      <h1 className='text-3xl md:text-4xl font-bold mb-8'>Explore My Work</h1>

        <MasonryGallary 
        photos={photos}
        />      

      {hasMore && (
        <div ref={loaderRef} className="w-full text-center py-10">
          <p className="text-gray-400">Loading more...</p>
        </div>
      )}
    </div>
  )
}

export default page;

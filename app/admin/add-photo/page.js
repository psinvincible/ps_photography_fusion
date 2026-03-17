"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("image not found!");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", image);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("ImageUrl:", data.url);
      if (res.ok && data.url) {
        toast.success("image Upload success");
        setForm((prev) => ({
          ...prev,
          imageUrl: data.url,
        }));
      } else {
        toast.error("Upload failed!");
      }
    } catch (err) {
      toast.error("Upload error!");
    }
    setUploading(false);
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const res = await fetch('/api/photos', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if(res.ok){
      router.push('/admin/dashboard');
    }else {
      alert("Error adding photo!");
    }
  }


  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <h2 className=' text-3xl font-bold mb-6'>Add Photo</h2>

      <form 
      onSubmit={handleSubmit}
      className='bg-white/10 p-6 rounded-xl shadow-md space-y-5'
      >

        <div>
          <label className='block text-sm font-medium mb-1'>Title</label>
        <input
        name='title'  
        type='text'
        placeholder='Title'
        className='w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-white/20'
        onChange={handleChange}
        />
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Image URL</label>
          <input
            name='imageUrl'
            placeholder='Image URL'
            type='text'
            className='w-full border rounded-lg px-3 py-2 bg-black cursor-not-allowed'
            value={form.imageUrl}
            disabled
          />
        </div>

        <div>
          <input 
          type="file"
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
          className='w-full border rounded-lg px-3 py-2'
          />

          <button
            onClick={handleImageUpload}
            type="button"
            className='px-4 py-2 bg-white text-black rounded'
            disabled={uploading}
          >{uploading ? "Uploading..." : "Upload Photo"}</button>

          {form.imageUrl && (
            <div>
              <img 
              src={form.imageUrl}
              alt="preview"
              className='w-40 h-40 object-cover rounded-lg border'
              />
            </div>
          )}
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Category</label>
        <input  
        type='text'
        name='category'
        placeholder='Category'
        className='w-full border rounded-lg px-3 py-2'
        onChange={handleChange}
        />
        </div>

        <div>
          
          <label className='block text-sm font-medium mb-1'>Description</label>
        <input  
        type='text'
        name='description'
        placeholder='Description'
        className='w-full border rounded-lg px-3 py-2'
        onChange={handleChange}
        />
        </div>
        
        <button className='w-full bg-white text-black py-2 rounded '>Add Photo</button>

      </form>
    </div>
  )
}

export default page

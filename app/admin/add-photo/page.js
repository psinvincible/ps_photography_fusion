"use client"

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter();
  const controllerRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    category: "",
    description: "",
    public_id: ""
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

    const controller = new AbortController();
    controllerRef.current = controller;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        signal: controller.signal
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
      if(err.name === "AbortError"){
      toast.error("Upload Cancelled!");
      }
      setUploading(false);
    }
  };

  const cancelUpload = () => {
    if(controllerRef.current){
      controllerRef.current.abort();
      setUploading(false);
    }
  }
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
      toast.success("Photo Added")
      router.push('/admin/dashboard');
    }else {
      toast.error("Error adding photo!");
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(!file) return;

    if(!file.type.startsWith("image/")){
      alert("Only image files are allowed.");
      return;
    }

    setImage(file);
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
          onChange={handleFileChange}
          className='w-full border rounded-lg px-3 py-2'
          />

          <button
            onClick={handleImageUpload}
            type="button"
            className='px-4 py-2 bg-white text-black rounded mx-4 my-2'
            disabled={uploading}
          >{uploading ? "Uploading..." : "Upload Photo"}</button>

          <button
            onClick={cancelUpload}
            type="button"
            className='px-4 py-2 bg-red-500 mx-4 my-2 text-white rounded'
          >Cancel</button>

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

"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    category: "",
    description: "",
  });


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
          <label className='block test-sm font-medium mb-1'>Image URL</label>
        <input  
        name='imageUrl'
        placeholder='Image URL'
        type='text'
        className='w-full border rounded-lg px-3 py-2'
        onChange={handleChange}
        />
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

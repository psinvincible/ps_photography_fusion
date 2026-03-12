"use client"

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
  const router = useRouter();
  const {id} = useParams();

  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    category: "",
    description: "",
  });


  const handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value})
  }

  const handleUpdate = async(e) => {
    e.preventDefault();

    console.log(form);

    const res = await fetch(`/api/photos/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form),
    });

    if(res.ok){
      router.push('/admin/dashboard');
    }else {
      alert("Error editing photo!");
    }
  }

  useEffect(() => {
    fetch(`/api/photos/${id}`).then((res) => res.json()).then((data) => setForm(data));
      
  }, [id])
  

  return (
    <div className='min-h-screen bg-black text-white flex justify-center items-center p-4 '>
      <form 
      onSubmit={handleUpdate}
      className='bg-white/10 p-6 rounded-xl w-full max-w-lg'
      >
        <h2 className=' text-2xl font-bold mb-4'>Edit Photo</h2>

        <input
        value={form.title}
        name='title'  
        type='text'
        placeholder='Title'
        className='w-full pb-2 mb-3 bg-black border border-white/20 rounded'
        onChange={handleChange}
        />

        <input  
        value={form.imageUrl}
        name='imageUrl'
        type='text'
        placeholder='Image URL'
        className='w-full pb-2 mb-3 bg-black border border-white/20 rounded'
        onChange={handleChange}
        />

        <input 
        value={form.category} 
        type='text'
        name='category'
        placeholder='Category'
        className='w-full pb-2 mb-3 bg-black border border-white/20 rounded'
        onChange={handleChange}
        />

        <input  
        value={form.description}
        type='text'
        name='description'
        placeholder='Description'
        className='w-full pb-2 mb-3 bg-black border border-white/20 rounded'
        onChange={handleChange}
        />
        
        <button className='w-full bg-white text-black py-2 rounded '>Edit Photo</button>

      </form>
    </div>
  )
}

export default page

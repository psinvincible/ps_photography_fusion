"use client"
import React from 'react'

const StatCard = ({title, value}) => {
  return (
    <div className={`border  rounded-xl p-5 bg-white/5 hover:bg-white/10 transition ${title === "Visitors" ? "border-green-500 " : "border-white/10"}`}>

        <p className='text-gray-400 text-sm'>{title}</p>
        <h3 className='text-2xl font-bold mt-2'>{value}</h3>
    </div>
  )
}

export default StatCard

"use client";

import StatCard from "@/components/Admin/StatCard";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    photos: 0,
    visitors: 0,
    contacts: 0,
    views: 0,
    likes: 0,
    wishes: 0,
    featured: 0,
  })

  const fetchStats = async() => {
    const res = await fetch('/api/admin/stat');
    const data = await res.json();
    setStats(data);
  }
  useEffect(() => {
    fetchStats();
  },[]);

  return (
    <div className="m-3">
      <h1 className="text-2xl font-bold mb-6 ">Admin Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mx-7">
        
        <StatCard title="Visitors" value={stats.visitors} />
        <StatCard title="Photos" value={stats.photos} />
        <StatCard title="Feedbacks" value={stats.contacts} />
        <StatCard title="Featured" value={stats.featured} />
        <StatCard title="Public Wishes (approved)" value={stats.wishes} />
        <StatCard title="Views" value={stats.views} />
        <StatCard title="Likes" value={stats.likes} />

      </div>

      <div className="mt-10">

        <h2 className="text-lg font-semibold mb-3">Pending Wishes</h2>

        <div className="border border-white/10 rounded-lg p-4 ">{stats.wishes} wishes waiting for approval</div>
      </div>
    </div>
  );
}

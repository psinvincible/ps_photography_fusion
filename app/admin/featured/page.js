"use client";
import { useEffect, useState } from "react";

export default function AdminFeatured() {
  const [active, setActive] = useState([]);
  const [expired, setExpired] = useState([]);

  const fetchData = async () => {
    const res = await fetch("/api/admin/featured");
    const data = await res.json();
    setActive(data.active);
    setExpired(data.expired);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/admin/featured`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  return (
    <div className="p-6 mx-auto space-y-12">
      <div className="flex justify-between items-center mb-6 ">
        <h1 className="text-xl md:text-3xl font-bold">Admin Featured Management</h1>

        <div>
        <button
          onClick={() => router.push("/admin/add-photo")}
          className="bg-purple-400 text-black px-4 py-2 mx-1 rounded-lg "
        >
          + Add Featured
        </button>
        </div>
      </div>

      <section>
        <h2 className="text-xl mb-6 text-green-400">Currently Active</h2>

        {active.length === 0 ? (
          <p className="text-gray-400">No active featured post.</p>
        ) : (
          <div className="grid md:grid-cols gap-6">
            {active.map((item) => (
              <div
                key={item._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4"
              >
                <img
                  src={item.imageUrl}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Expires: {new Date(item.expiresAt).toLocaleString()}
                  </p>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="mt-3 text-red-400 hover:text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl mb-6 text-yellow-400">Recently Expired</h2>

        {expired.length === 0 ? (
          <p className="text-gray-400">No expired post yet.</p>
        ) : (
          <div className="grid md:grid-cols gap-6">
            {expired.map((item) => (
              <div
                key={item._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4"
              >
                <img
                  src={item.imageUrl}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Expired On: {new Date(item.expiresAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

export default function AdminWishesManagement() {
  const [wishes, setWishes] = useState([]);

  const approveWish = async (id) => {
    const res = await fetch(`/api/admin/wish/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });

    if (res.ok) {
      alert("Wish Approved!");
      return;
    } else {
      alert("Something went wrong");
    }
  };

  const deleteWish = async (id) => {
    const res = await fetch(`/api/admin/wish/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });

    if (res.ok) {
      alert("Wish Deleted!");
      return;
    } else {
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    const fetchWishes = async () => {
      const res = await fetch("/api/admin/wish");
      const data = await res.json();
      setWishes(data.wishes);
    };

    fetchWishes();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl md:text-3xl font-bold">Public Wishes</h1>

      {wishes.map((wish) => (
        <div
          key={wish._id}
          className="border border-white/10 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="space-y-1">
              <h2 className="font-semibold text-lg">{wish.name}</h2>
              <p className="text-gray-400 text-sm md:text-base">
                {wish.message}
              </p>

              {wish.approved && (
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                  Approved
                </span>
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => approveWish(wish._id)}
                className={`px-3 py-1 rounded text-sm transition ${wish.approved ? "bg-green-500/20 text-green-400 cursor-default" : "bg-green-500 hover:bg-green-600 text-white"}`}
              >
                {wish.approved ? "APPROVED" : "Approve"}
              </button>

              <button
                onClick={() => deleteWish(wish._id)}
                className={`px-3 py-1 rounded text-sm transition ${wish.approved ? "disabled opacity-30 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"} `}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      {wishes?.length === 0 && (
        <div>
          <h3>No messages to display!</h3>
        </div>
      )}
    </div>
  );
}

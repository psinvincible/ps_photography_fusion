"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeaturedSection() {
  const [active, setActive] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await fetch("/api/featured");
      const data = await res.json();
      setActive(data.featured);
    };

    fetchFeatured();
  }, []);

  return (
    <>
        <h1 className="text-center font-bold text-4xl">Featured Section</h1>
      {active.length !== 0 ? (
        <div className="max-w-5xl mx-auto mt-10 px-4">
          {active.map((featured) => (
            <div
              key={featured._id}
              onClick={() => setSelected(featured)}
              className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 cursor-pointer mb-3"
            >
              <div className="h-40 w-40 md:w-52 md:h-52 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="text-center md:text-left flex-1">
                <p className="text-sm uppercase tracking-widest text-gray-400 mb-1">
                  🌟 Featured Moment
                </p>

                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {featured.title}
                </h2>

                <p className="text-gray-300 mb-4 ">{featured.message}</p>

                {featured.link && (
                  <a
                    href={featured.link}
                    target="_blank"
                    className="inline-block border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
                  >
                    View More
                  </a>
                )}

                <p className="text-xs text-gray-500 mt-3">Expires soon ⏳</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto mt-16 text-center px-6 py-12  border border-dashed border-white/20 rounded-3xl bg-white/5 backdrop-blur-lg">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Wanna Get Featured on Our Website ?
          </h2>

          <p className="text-gray-400 mb-6 ">
            Celebrate Birthdays, Anniversaries, or special moments with a
            featured Wish 🎉
          </p>

          <Link
                href="/wish"
                className="px-6 py-2 rounded-full border border-white hover:bg-white hover:text-black transition"
                >Submit a Wish 💌</Link>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">

            <div className="bg-black border border-white/20 rounded-2xl max-w-lg w-full p-6 relative">

            <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >✕</button>

            <img 
            src={selected.imageUrl}
            className="w-full h-64 object-cover rounded-xl"
            />

            <h2 className="text-2xl font-bold mt-4 ">{selected.title}</h2>

            <p className="text-gray-400 mt-2">{selected.message}</p>

            <p className="text-sm text-gray-500 mt-2">Expires: {new Date(selected.expiresAt).toLocaleString()}</p>

            {selected.link && (
                <a
                href={selected.link}
                target="_blank"
                className="inline-block mt-4 border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
                >Visit Link</a>
            )}
            </div>
        </div>
      )}
    </>
  );
}

"use client"
import Link from "next/link"

const GetFeaturedCTA = () => {

  return (
    <div className="max-w-4xl mx-auto mt-16 text-center px-6 py-12  border border-dashed border-white/20 rounded-3xl bg-white/5 backdrop-blur-lg">

                <h2 className="text-2xl md:text-3xl font-semibold mb-3">Wanna Get Featured on Our Website ?</h2>

                <p className="text-gray-400 mb-6 ">Celebrate Birthdays, Anniversaries, or special moments with a featured Wish 🎉</p>

                <Link
                href="/wish"
                className="px-6 py-2 rounded-full border border-white hover:bg-white hover:text-black transition"
                >Submit a Wish 💌</Link>
            </div>
  )
}

export default GetFeaturedCTA

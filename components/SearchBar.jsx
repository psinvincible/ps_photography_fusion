"use client"

import { IoMdClose, IoMdSearch } from "react-icons/io";

export default function SearchBar({query, setQuery}){

    return (
        <div className="w-full max-w-xl mx-auto mb-6 px-3 sm:px-0">
            <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg "><IoMdSearch /></span>

            <input 
                type="text"
                placeholder="Search Photos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className=" w-full pl-12 pr-12 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 py-2"
                />
            {query && (
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition duration-200 text-lg "
                aria-label="Clear search"
                >
                    <IoMdClose onClick={() => setQuery("")} />
                </button>
            )}
            </div>
        </div>
    )
}
"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";

export default function Footer(){
    const [visitors, setVisitors] = useState(0);
    const [ip, setIp] = useState("");
    
    
    useEffect(() => {
        const fetchVisitors = async() => {
            const res = await fetch("/api/stat/visit");
            const data = await res.json();
            setVisitors(data.visitors);
            setIp(data.ip);
        }
        fetchVisitors();

        const interval = setInterval(() => {
            fetchVisitors();
        }, 10000);

        return () => clearInterval(interval);
    }, [])
    
    return(
        <footer className="bg-black border-t border-white/10 mt-20 text-white">
            <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

                <div>
                    <p className="text-gray-400">Made with &hearts; and light.</p>
                    <h2 className="text-xl font-bold mb-2 ">ps_photography_fusion</h2>
                    <p className="text-gray-400 text-sm">Nature's Love: Capturing the moments that last forever.</p>                    
                </div>
                
                <div className="text-sm flex flex-col gap-2 border-l border-gray-400 pl-2">
                    <Link href='/'>Home</Link>
                    <Link href='/explore'>Explore</Link>
                    <Link href='/featured'>Featured Section</Link>
                    <Link href='/about'>About Us</Link>
                    <Link href='/contact'>Contact Us</Link>
                </div>

                <div className="">
                    <a href="https://www.instagram.com/ps_photography_fusion" className="flex items-center" target="_blank">Follow Us:&nbsp;&nbsp;&nbsp;<FaInstagram /></a>
                    <p>Visitors since launch: <span className="px-3 bg-gray-400 font-medium rounded-xl border">{visitors}</span></p>
                    <p className="text-xs mt-2">Your IP: <span className="px-2 bg-gray-700 rounded text-white">{ip}</span></p>
                </div>                               
                    
            </div>

            <div className="text-center text-gray-500 text-sm pb-6">&copy; {new Date().getFullYear()} ps_photography_fusion. All rights reserved.</div>
        </footer>
    )
}
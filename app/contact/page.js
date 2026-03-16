"use client"

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage(){
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        setLoading(true);

        const res = await fetch('/api/contact', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: form.name,
                email: form.email,
                message: form.message,
            }),
        })

        const data = await res.json();

        if(data.success){
            toast.success("Message sent successfully.");
            setForm({name: "", email: "", message: ""});
            setLoading(false);
        }else {
            toast.error("Error occured.");
        }

        
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-12 text-center">Contact Me</h1>

            <div className="grid md:grid-cols-2 gap-10">
                {/* left side */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Get in Touch</h2>

                    <p className="text-white/70">Feel free to reach out for feature your moment in our dedicated section for featuring or any photography inquiries</p>

                    <div className="space-y-4 text-white/80">
                        <div>
                            <p className="text-sm text-white/50">Email</p>
                            <p className="font-medium">youremail@gmail.com</p>
                        </div>

                        <div>
                            <p className="text-sm text-white/50">Phone</p>
                            <p className="font-medium">+91 9876543210</p>
                        </div>

                        <div>
                            <p className="text-sm text-white/50">Address</p>
                            <p className="font-medium">Fetching address details...</p>
                        </div>
                    </div>
                </div>

                {/* right side     */}

                <form onSubmit={handleSubmit}>
                    <input
                     name="name"
                     type="text"
                     value={form.name}
                     placeholder="Your Name"
                     onChange={handleChange}
                     className="w-full p-3 m-2 bg-black border border-white/20 rounded-lg"
                    />

                    <input 
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full p-3 m-2 bg-black border border-white/20 rounded-lg"
                    />

                    <textarea 
                    name="message"
                    placeholder="Your message"
                    value={form.message}
                    rows={6}
                    onChange={handleChange}
                    className="w-full p-3 m-2 bg-black border border-white/20 rounded-lg"
                    />

                    <button className={`w-full m-2 border border-white p-6 py-3 rounded-lg hover:bg-white hover:text-black transition`}
                    disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    )
}
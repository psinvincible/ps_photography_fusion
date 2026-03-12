"use client"

import { useEffect, useState } from "react"

export default function AdminMessages(){
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        fetchMessages();
    },[]);
    const fetchMessages = async() => {
        const res = await fetch('/api/admin/contact');
        const data = await res.json();
        setMessages(data.messages);
    }
    return (
        <div className="space-y-6 p-6">
            <h1 className="text-xl md:text-3xl font-bold">User Messages/Feedbacks/Queries</h1>

            {messages.map((message) => (
                <div className="border border-white/10 p-4 rounded-lg"
                key={message._id}
                >
                    <h2 className="font-semibold">{message.name}</h2>
                    <p className="text-gray-400 text-sm">Request On: {new Date(message.createdAt).toLocaleString()}</p>
                    <p className="text-gray-400 text-sm ">{message.email}</p>
                    <p className="mt-2">{message.message}</p>
                </div>
            ))}
            {messages?.length === 0 && (
                <div>
                    <h3>No messages to display!</h3>
                </div>
            ) }
        </div>
    )
}
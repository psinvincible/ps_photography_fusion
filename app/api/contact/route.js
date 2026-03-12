import { connectDB } from "@/lib/connectDB";
import Contact from "@/models/Contact";


export async function POST(req){
    try {
        await connectDB();

        const {name, email, message} = await req.json();

        if(!name || !email || !message)return Response.json({message: "All fields are required!"},{status: 400});

        const contact = await Contact.create({name, email, message});
        console.log(contact);

        return Response.json({success: true, contact});
    } catch (error) {
        return Response.json({error: "Internal server error!"},{status: 500});
    }
}
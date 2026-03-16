import { connectDB } from "@/lib/connectDB";
import Wish from "@/models/Wish";


export async function POST(req){
    try {
        await connectDB();

        const body = await req.json();

        const wish = await Wish.create({
            name: body.name,
            email: body.email,
            title: body.title,
            message: body.message,
            imageUrl: body.imageUrl,
            link: body.link,
        })

        return Response.json({wish}, {success: true});
    } catch (error) {
        return Response.json({error: "Failed to submit wish"}, {status: 500});
    }
}
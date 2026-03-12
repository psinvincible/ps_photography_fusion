import { connectDB } from "@/lib/connectDB";
import Wish from "@/models/Wish";


export async function POST(req){
    try {
        await connectDB();

        const body = await req.json();
        console.log(body);

        const wish = await Wish.create({
            name: body.name,
            email: body.email,
            title: body.title,
            message: body.message,
            imageUrl: body.imageUrl,
            link: body.link,
        })
        console.log(wish);

        return Response.json({wish}, {success: true});
    } catch (error) {
        return Response.json({error: "Failed to submit wish"}, {status: 500});
    }
}
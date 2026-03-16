import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { connectDB } from "@/lib/connectDB";
import Featured from "@/models/Featured";


export async function GET(){
    try {
        await connectDB();
        const featured  = await Featured.find({ expiresAt: {$gt: new Date()}, isActive: true}).sort({ createdAt: -1});

        return Response.json({featured}, {status: 201});
    } catch (error) {
        return Response.json({message: error}, {status: 500});
    }
}


export async function POST(req){
    try {
        await connectDB();
        
        const {title, message, imageUrl, link, animation} = await req.json();

        const user = await getUserFromCookie();
        if(!user && user.role !== "admin")return Response.json({error: "Unauthorized"},{status: 401});

        await Featured.updateMany({isActive: true}, {isActive: false});

        const newFeatured = await Featured.create({
            title, message, imageUrl, link, animation, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        return Response.json(newFeatured, {status: 201});

    } catch (error) {
        return Response.json({message: error}, {status: 500});
    }
}
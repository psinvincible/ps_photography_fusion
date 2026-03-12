import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { connectDB } from "@/lib/connectDB";
import Photo from "@/models/Photo";

export async function GET(req) {
    try {
        await connectDB();

        const user = await getUserFromCookie();
        if(!user && user.role !== "admin")return Response({error:  "User Not Found!"},{status: 404});

        const photos = await Photo.find();
        if(!photos)return Response.json({error: "Photos not found"});
        return Response.json(photos, {status:201})
    } catch (error) {
        return Response.json({message: error}, {status: 501});
    }
}
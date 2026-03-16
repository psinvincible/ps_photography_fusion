import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { connectDB } from "@/lib/connectDB";
import Featured from "@/models/Featured";
import Wish from "@/models/Wish";

export async function DELETE(req, {params}){
    try {
        await connectDB();
        const user = await getUserFromCookie();
        if(!user && user.role !== "admin")return Response.json({message: "Unauthorized"},{status: 401});

        const {id} = await params;

        const deletedWish = await Wish.findByIdAndDelete(id);
        if (!deletedWish) {
            return Response.json({error: "Wish not found"}, {status: 404});
        }
        return Response.json({success: true, deletedWish});

    } catch (error) {
        return Response.json({error: "failed to delete Wish"}, {status: 500});
    }
}

export async function PATCH(req, {params}){
    try {
        await connectDB();
        const user = await getUserFromCookie();
        if(!user && user.role !== "admin")return Response.json({message: "Unauthorized"},{status: 401});

        const {id} = await params;
    
        const wish = await Wish.findById(id);
        if(!wish) return Response.json({error: "No Wish found"}, {status: 404});

        const approvedWish = await Featured.create({
            title: wish.title,
            message: wish.message,
            imageUrl: wish.imageUrl,
            link: wish.link,
            isActive: true,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        wish.approved = true
        wish.save();

        return Response.json({approvedWish}, {success: true});
    } catch (error) {
        return Response.json({error: "failed to approve Wish"}, {status: 500});
    }
}
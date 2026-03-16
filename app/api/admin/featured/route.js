import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { connectDB } from "@/lib/connectDB";
import Featured from "@/models/Featured";


export async function GET(){
    try {
        await connectDB();

        const user = await getUserFromCookie();
        if(!user && user.role !== "admin") return Response.json({error: "Unauthorized!"}, {status: 401});

        const now = new Date();

        const active = await Featured.find({expiresAt: {$gt: now}}).sort({ createdAt: -1});

        const expired = await Featured.find({expiresAt: {$lte: now}}).sort({createdAt: -1});

        return Response.json({active, expired});
    } catch (error) {
        return Response.json({message: "Internal server error."}, {status: 500});
    }
}

export async function DELETE(req){
    try {
        await connectDB();

        const user = await getUserFromCookie();
        if(!user && user.role !== "admin") return Response.json({error: "Unauthorized!"}, {status: 401});

        const {id} = await req.json();

        const deleted = await Featured.findByIdAndDelete(id);

        return Response.json({success: true});
        
    } catch (error) {
        return Response.json({message: "Failed to delete!"}, {status: 500});
    }
}
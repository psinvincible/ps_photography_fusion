import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { connectDB } from "@/lib/connectDB";
import Featured from "@/models/Featured";
import Wish from "@/models/Wish";


export async function GET(){
    try {
        await connectDB();
        
        const user = await getUserFromCookie();
        if(!user && user.role !== "admin")return Response.json({message: "Unauthorized"},{status: 401});

        const wishes = await Wish.find().sort({createdAt: -1});
        //console.log(wishes);

        return Response.json({wishes});
    } catch (error) {
        return Response.json({error: "Failed to fetch Wishes"}, {status: 500});
    }
}



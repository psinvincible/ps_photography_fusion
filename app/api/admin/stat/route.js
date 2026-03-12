import { connectDB } from "@/lib/connectDB";
import Photo from "@/models/Photo";
import Stat from "@/models/Stat";
import Wish from "@/models/Wish";


export async function GET(){
    try {
        await connectDB();

        const photos = await Photo.countDocuments();
        const wishes = await Wish.countDocuments({approved: false});
        const stats = await Stat.findOne();
        
        // views and likes are pending for now to be updated
        const views = 0;
        const likes = 0;

        return Response.json({photos, visitors: stats?.visitors || 0, wishes, likes, views})

    } catch (error) {
        return Response.json({error: "Internal Error"}, {status: 500});
    }
}
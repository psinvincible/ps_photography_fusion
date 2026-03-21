import { connectDB } from "@/lib/connectDB";
import Photo from "@/models/Photo";

export async function GET(){
    try {
        await connectDB();

        const result = await Photo.aggregate([
            {
                $group: {
                    _id: null,
                    totalViews: {$sum: "$views"}
                }
            }
        ]);

        return Response.json({totalViews: result[0]?.totalViews || 0});
    } catch (error) {
        return Response.json({error: "Internal Error"}, {status: 500});
    }
}
import { connectDB } from "@/lib/connectDB";
import Featured from "@/models/Featured";


export async function GET(){
    try {
        await connectDB();
        
        const newFeatured = await Featured.findOne({isActive: true});

        if(!newFeatured){
            return Response.json({hasNew: false});
        }else {
            return Response.json({hasNew: true});
        }


    } catch (error) {
        return Response.json({error: "Internal Server Error"},{status: 500});
    }
}
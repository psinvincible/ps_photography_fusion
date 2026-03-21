import { connectDB } from "@/lib/connectDB";
import Photo from "@/models/Photo";
import View from "@/models/View";


export async function POST(req, {params}){
    try {
        await connectDB();
        
        const {id} = await params;
        console.log(id);
        if(!id) return Response.json({error: "Photo id not found!"});

        //the below code will find the ip of user.
        const ip = req.headers.get('x-forwarded-for') || "unknown";
        console.log("User ip:", ip); 

        //the below code will check if already viewd the photo or not
        const existing = await View.findOne({photoId: id, ip});
        if(existing){
            return Response.json({success: true, message: "Already View"});
        }
        
        await View.create({photoId: id, ip});

        const updateViews = await Photo.findByIdAndUpdate(id, {$inc: {views: 1}});

        return Response.json({success: true});


    } catch (error) {
        return Response.json({error: "Internal Error"}, {status: 500});
    }
}
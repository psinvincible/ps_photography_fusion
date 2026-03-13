import { connectDB } from "@/lib/connectDB";
import Stat from "@/models/Stat";


export async function POST(req){
    try {
        await connectDB();

        let stats = await Stat.findOne();

        if(!stats){
            stats = await Stat.create({ visitors: 1});
        }else {
            stats.visitors += 1;
            await stats.save();
        }

        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || "Unknown";
        console.log("Visitor IP:", ip);

        return Response.json({visitors: stats.visitors, ip})
    } catch (error) {
        
    }
}

export async function GET(req){
    await connectDB();

    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || "Unknown";
        console.log("Visitor IP:", ip);

    const stats = await Stat.findOne();
    const visitors = stats ? stats.visitors : 0;
    return Response.json({visitors, ip}, {status: 200});
}
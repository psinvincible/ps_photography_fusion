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

        return Response.json({visitors: stats.visitors})
    } catch (error) {
        
    }
}

export async function GET(){
    await connectDB();

    const stats = await Stat.findOne();
    const visitors = stats ? stats.visitors : 0;
    return Response.json({visitors}, {status: 200});
}
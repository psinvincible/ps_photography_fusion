import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { connectDB } from "@/lib/connectDB";
import Contact from "@/models/Contact";

export async function GET() {
    try {
        await connectDB();
        const user = await getUserFromCookie();
        if(!user) return Response({error: "Unauthorized!"}, {status: 401});

        const messages = await Contact.find();

        return Response.json({success: true, messages});
    } catch (error) {
        return Response.json({error: "Internal error!"}, {status: 500});
    }
}
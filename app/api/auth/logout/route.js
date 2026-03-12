import { getUserFromCookie } from "@/lib/auth/getUserFromCookie";
import { connectDB } from "@/lib/connectDB";

export async function POST(req) {
  try {
    await connectDB();
    const user = await getUserFromCookie();
    if (!user)
      return Response.json({ error: "User not found!" }, { status: 404 });

    return new Response(JSON.stringify({ message: "Logged Out!" }), {
      status: 200,
      headers: {
        "Set-Cookie": `adminToken=; Path=/; HttpOnly; Max-Age=0`,
      },
    });
  } catch (error) {
    return Response.json({error: "Internal Error"}, {status: 500});
  }
}

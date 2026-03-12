import { cookies } from "next/headers";
import { verifyToken } from "./verifyToken";

export async function getUserFromCookie(){
    const cookieStore = await cookies();
    const token =  cookieStore.get("adminToken")?.value;

    if(!token) return null;

    const user = verifyToken(token);
    
    return user;
}
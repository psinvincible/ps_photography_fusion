import jwt from "jsonwebtoken";

export function verifyToken(token){
    try {
        if(!token) return null;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        return decoded;
    } catch (error) {
        return null;
    }
}
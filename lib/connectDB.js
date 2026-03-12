import mongoose from "mongoose";

const MONGODB_URI = `${process.env.MONGODB_URI}photography`

export async function connectDB() {
    if(mongoose.connect.readyState === 1){
        console.log("DB already connected!!");
        console.log(process.env.MONGODB_URI);
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.log("MongoDB connection failed:", error.message);
        throw error;
    }
}
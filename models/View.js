import mongoose from "mongoose";

const viewSchema = new mongoose.Schema(
    {
        photoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Photo",
        },
        ip: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 60 * 60 * 24,
        }
    }
);


export default mongoose.models.View || mongoose.model("View", viewSchema);
import mongoose from "mongoose";

const featuredSectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        link: {
            type: String,
        },
        animation: {
            type: String,
            enum: ["bounce", "pulse", "glow", "none"],
            default: "glow",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        expiresAt: {
            type: Date,
            required: true,
        }
    },{timestamps: true}
)

export default mongoose.models.FeaturedSection || mongoose.model("FeaturedSection", featuredSectionSchema);
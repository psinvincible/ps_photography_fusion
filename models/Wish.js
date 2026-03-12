import mongoose from "mongoose";

const wishSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            require: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        link: {
            type: String,
        },
        approved: {
            type: Boolean,
            default: false,
        },

    },{timestamps: true},
);

export default mongoose.models.Wish || mongoose.model("Wish", wishSchema);
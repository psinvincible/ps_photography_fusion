const  mongoose  = require("mongoose");

const photoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: "General",
        },
        description: {
            type: String,
        },
        public_id: {
            type: String,
        }
    },{timestamps: true}
);

export default mongoose.models.Photo || mongoose.model("Photo", photoSchema);
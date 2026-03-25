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
        },
        views: {
            type: Number,
            default: 0,
        },
        likes: {
            type: Number,
            default: 0,
        },
        exif: {
            camera: String,
            iso: Number,
            aperture: Number,
            shutter: String,
            focalLength: Number,
        }
    },{timestamps: true},
);

export default mongoose.models.Photo || mongoose.model("Photo", photoSchema);
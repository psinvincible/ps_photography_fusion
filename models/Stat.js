const mongoose = require("mongoose");

const statSchema = new mongoose.Schema(
    {
        visitors: {
            type: Number,
            default: 0,
        }
    },{timestamps: true}
);

export default mongoose.models.Stat || mongoose.model("Stat", statSchema)
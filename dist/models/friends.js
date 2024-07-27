import mongoose from "mongoose";
import validator from "validator";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Name"],
    },
    email: {
        type: String,
        unique: [true, "Email already exist"],
        required: [true, "Please enter Email"],
        validate: validator.default.isEmail,
    },
    userId: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please enter Gender"],
    },
});
export const Friend = mongoose.model("Friend", schema);

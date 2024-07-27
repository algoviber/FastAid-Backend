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
    bloodGroup: {
        type: String,
        required: [true, "Please Enter Blood Group"],
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please enter Gender"],
    },
    userId: {
        type: String,
    },
});
export const Donor = mongoose.model("Donor", schema);

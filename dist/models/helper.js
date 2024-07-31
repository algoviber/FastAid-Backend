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
    location: {
        lati: {
            type: String,
            required: [true, "Please Enter Location"],
        },
        longi: {
            type: String,
            required: [true, "Please Enter Location"],
        },
        address: {
            type: String,
            required: [true, "Please Enter Location"],
        }
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please enter Gender"],
    },
    userId: {
        type: String,
    }
}, {
    timestamps: true,
});
export const Helper = mongoose.model("Helper", schema);

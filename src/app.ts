import express from "express";
import { connectDB } from "./utils/features.js";

import { errorMiddleware } from "./middlewares/error.js";

import NodeCache from "node-cache";
import {config} from "dotenv";
import morgan from 'morgan';
import cors from "cors";

//importing Routes
import userRoute from "./routes/user.js";
import registerRoute from "./routes/register.js";
import otpRoute from "./routes/otp.js";
import mongoose from "mongoose";


const app = express();

config({
    path: "./.env",
})

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";

connectDB(mongoURI);

export const myCache = new NodeCache();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());





app.get("/", (req,res)=>{
    res.send("API Working with /api/v1");
})

app.use("/api/v1/user",userRoute);
app.use("/api/v1/register",registerRoute);
app.use("/api/v1/otp",otpRoute);


app.use(errorMiddleware);

app.listen(port,()=>{
    console.log(`Server is working on http://localhost:${port}`);
});

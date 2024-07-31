import express from "express";
import { sendOtp } from "../utils/features.js";

const app = express.Router();

app.post("/send",sendOtp);

export default app;
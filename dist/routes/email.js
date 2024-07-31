import express from "express";
const app = express.Router();
app.post("/help", emailHelpers);
export default app;

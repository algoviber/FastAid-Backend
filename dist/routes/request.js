import express from "express";
import { emailContacts, emailDonors, emailHelpers, emailMessage } from "../controllers/request.js";
import { userOnly } from "../middlewares/auth.js";
const app = express.Router();
app.post("/help", userOnly, emailHelpers);
app.post("/blood", userOnly, emailDonors);
app.post("/sos", userOnly, emailContacts);
app.post("/message", userOnly, emailMessage);
export default app;

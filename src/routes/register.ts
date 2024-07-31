import express from "express";
import { allDonors, myFriends, allHelpers, myDonors, myHelperInfo, newDonor, newFriend, newHelper } from "../controllers/register.js";
import { userOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/donor/new",userOnly,newDonor);
app.post("/friend/new",userOnly,newFriend);
app.post("/helper/new",userOnly,newHelper);

app.get("/helper/all",userOnly,allHelpers);
app.get("/donor/all",userOnly,allDonors);
app.get("/friends/my",userOnly,myFriends);

app.get("/helper/my",userOnly,myHelperInfo);
app.get("/donors/my",userOnly,myDonors);


export default app;
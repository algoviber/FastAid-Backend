import { NextFunction,Request,Response } from "express";
import mongoose, { Document } from "mongoose";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "./utility-class.js";
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

const Twilio = require('twilio');

const accountSid = "AC59e83d7fb6677b8293db4b86fbe3ab97" || process.env.TWILIO_SID;
const authToken = "38292609b7b5963013e79323f6d853cc" || process.env.TWILIO_AUTH_TOKEN;
const client = Twilio(accountSid, authToken);
const verifyServiceSid = "VAbe157de4fe3bd4694730290f3ba70119" || process.env.TWILIO_VERIFY_SSID;

export const connectDB = (uri: string)=>{
    mongoose.connect(uri,{
        dbName: "FastAid",
    })
    .then(c=> console.log(`DB Connected to ${c.connection.host}`))
    .catch((e)=> console.log(e));
}

export const sendOtp = TryCatch(
    async (
    req:Request, 
    res:Response, 
    next:NextFunction)=> {

        const phoneNumber = req.body.phone;

        if(!phoneNumber){
            return next (new ErrorHandler("Please enter Mobile Number",400));
        }

        const verification = await client.verify.v2.services(verifyServiceSid)
            .verifications
            .create({ to: '+917742788510', channel: 'sms' });

        console.log('OTP sent successfully:', verification);

        return res.status(201).json({
            success: true,
            message: `Thanks for registering!`,
        });
     
}
);
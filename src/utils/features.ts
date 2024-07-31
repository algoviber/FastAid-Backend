import { NextFunction,Request,Response } from "express";
import mongoose, { Document } from "mongoose";
import { TryCatch } from "../middlewares/error.js";
import nodemailer from "nodemailer";
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

export const sendEmail = async (recipients: any[], subject: any, text: any, html: any) => {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com', // e.g., smtp.gmail.com for Gmail
        port: 587, // or 465 for secure connection
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER, // your email from env
            pass: process.env.SMTP_PASS // your email password from env
        }
    });

    // Define email options
    const mailOptions = {
        from: `"Fast Aid" <${process.env.SMTP_USER}>`, // sender address
        to: recipients.join(','), // list of receivers
        subject: subject, // Subject line
        text: text || '', // plain text body
        html: html || '' // html body
    };

    console.log(mailOptions);

    // Send email
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
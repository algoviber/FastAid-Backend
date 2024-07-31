import { TryCatch } from "../middlewares/error.js";
import { Helper } from "../models/helper.js";
import { User } from "../models/user.js";
import { Donor } from "../models/donor.js";
import { Friend } from "../models/friends.js";
import { sendEmail } from "../utils/features.js";
import haversine from "haversine";
export const emailHelpers = TryCatch(async (req, res, next) => {
    const data = req.body.requestInfo;
    const { _id } = req.query;
    const userId = String(_id);
    const user = await User.findById(_id);
    const phoneNumber = user?.phone;
    const helpers = await Helper.find({ userId: { $ne: userId } });
    const nearbyHelpers = helpers.filter(helper => {
        const start = {
            latitude: Number(data.location.lati),
            longitude: Number(data.location.longi)
        };
        const end = {
            latitude: Number(helper.location?.lati),
            longitude: Number(helper.location?.longi)
        };
        const distance = haversine(start, end, { unit: 'km' });
        return distance <= 10;
    }).map(helper => helper.email);
    const text = "Urgent Help Needed!!";
    const html = `<div><h1>Urgent Help Needed!!</h1><h3>Below is the Information</h3><ul><li>Name: ${data.name}</li>
     <li>Gender: ${data.gender}</li> <li>Description: ${data.description}</li>
     <li>Location: ${data.location.address}</li> <li>Mobile Number: ${phoneNumber}</li>
     <li>Latitude: ${data.location.lati}</li> <li>Longitude: ${data.location.longi}</li></ul>
     <button><a href='https://www.google.com/maps/dir/?api=1&destination=${data.location.lati},${data.location.longi}' >Accept Request</a></button></div>`;
    const response = await sendEmail(nearbyHelpers, "Request for Help", text, html);
    return res.status(201).json({
        success: true,
        message: `Request Sent Successfully`,
    });
});
export const emailDonors = TryCatch(async (req, res, next) => {
    const data = req.body.requestInfo;
    const { _id } = req.query;
    const userId = String(_id);
    const user = await User.findById(_id);
    const phoneNumber = user?.phone;
    const receivers = await Donor.find({ userId: { $ne: userId } }, { bloodGroup: data.blood }).distinct("email");
    const text = "Urgent Blood Needed!!";
    const html = `<div><h1>Urgent Blood Needed!!</h1><h3>Below is the Information</h3><ul><li>Name: ${data.name}</li>
     <li>Gender: ${data.gender}</li> <li>Blood Group: ${data.blood}</li>
     <li>Quantity: ${data.quantity} units</li> <li>Mobile Number: ${phoneNumber}</li>
     <li>Email address: ${data.email}</li>
     <button>Accept Request</button></div>`;
    const response = await sendEmail(receivers, "Request for Blood", text, html);
    return res.status(201).json({
        success: true,
        message: `Request Sent Successfully`,
    });
});
export const emailContacts = TryCatch(async (req, res, next) => {
    const data = req.body.requestInfo;
    const { _id } = req.query;
    const userId = String(_id);
    const user = await User.findById(_id);
    const phoneNumber = user?.phone;
    const receivers = await Friend.find({ userId: userId }).distinct("email");
    const text = "Your Friend in in Need!!";
    const html = `<div><h1>Your Friend in in Need!!</h1><h3>Below is the Information</h3><ul><li>Name: ${user?.name}</li>
     <li>Gender: ${user?.gender}</li>  <li>Mobile Number: ${phoneNumber}</li>
     <li>Location: ${data.location.address}</li>
     <li>Latitude: ${data.location.lati}</li> <li>Longitude: ${data.location.longi}</li>
     <button><a href='https://www.google.com/maps/dir/?api=1&destination=${data.location.lati},${data.location.longi}' >Accept Request</a></button></div>`;
    const response = await sendEmail(receivers, "Request for Help", text, html);
    return res.status(201).json({
        success: true,
        message: `Request Sent Successfully`,
    });
});
export const emailMessage = TryCatch(async (req, res, next) => {
    const data = req.body.requestInfo;
    const text = "Your Friend in in Need!!";
    const html = `<div><h1>Message from a User!!</h1><h3>Below is the Information</h3><ul><li>Name: ${data.name}</li>
     <li>Email Address: ${data.email}</li>
     <li>Message: ${data.message}</li>`;
    await sendEmail(['aryangupta16082003@gmail.com'], "New Message for FastAid", text, html);
    return res.status(201).json({
        success: true,
        message: `Request Sent Successfully`,
    });
});

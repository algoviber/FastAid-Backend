import { TryCatch } from "../middlewares/error.js";
import { Donor } from "../models/donor.js";
import { Friend } from "../models/friends.js";
import { Helper } from "../models/helper.js";
import ErrorHandler from "../utils/utility-class.js";
export const newHelper = TryCatch(async (req, res, next) => {
    const { _id } = req.query;
    const userId = String(_id);
    const { name, email, gender, location } = req.body.helperInfo;
    if (!location || !name || !email || !gender) {
        return next(new ErrorHandler("Please add all fields", 400));
    }
    const helper = await Helper.create({
        name,
        email,
        gender,
        location,
        userId
    });
    return res.status(201).json({
        success: true,
        message: `Thanks for registering!`,
    });
});
export const newDonor = TryCatch(async (req, res, next) => {
    const { _id } = req.query;
    const userId = String(_id);
    const data = req.body;
    const donors = data.allFormsData;
    for (const [index, donorData] of donors.entries()) {
        const { name, email, gender, blood } = donorData;
        if (index == 0 && (!blood || !name || !email || !gender)) {
            return next(new ErrorHandler("Please add all fields", 400));
        }
        else if (!blood || !name || !email || !gender) {
            continue;
        }
        const donor = await Donor.create({
            name,
            email,
            gender,
            userId,
            bloodGroup: blood
        });
        console.log(donor);
    }
    return res.status(201).json({
        success: true,
        message: `Thanks for registering!`,
    });
});
export const newFriend = TryCatch(async (req, res, next) => {
    const { _id } = req.query;
    const userId = String(_id);
    const data = req.body;
    const contacts = data.allFormsData;
    for (const [index, contactData] of contacts.entries()) {
        const { name, email, gender } = contactData;
        if (index == 0 && (!name || !email || !gender)) {
            return next(new ErrorHandler("Please add all fields", 400));
        }
        else if (!name || !email || !gender) {
            continue;
        }
        const contact = await Friend.create({
            name,
            email,
            gender,
            userId,
        });
    }
    return res.status(201).json({
        success: true,
        message: `Thanks for registering!`,
    });
});
export const allHelpers = TryCatch(async (req, res, next) => {
    const { _id } = req.query;
    const { location } = req.body;
    const userId = String(_id);
    const helpers = await Helper.find({});
    return res.status(201).json({
        success: true,
        helpers,
    });
});
export const allDonors = TryCatch(async (req, res, next) => {
    const { _id } = req.query;
    const { bloodGroup } = req.body;
    const userId = String(_id);
    const donors = await Donor.find({ bloodGroup });
    return res.status(201).json({
        success: true,
        donors,
    });
});
export const myFriends = TryCatch(async (req, res, next) => {
    const { _id } = req.query;
    const userId = String(_id);
    const friends = await Friend.find({ userId });
    return res.status(201).json({
        success: true,
        friends,
    });
});
export const myDonors = TryCatch(async (req, res, next) => {
    const { _id } = req.query;
    const userId = String(_id);
    const donors = await Donor.find({ userId });
    return res.status(201).json({
        success: true,
        donors,
    });
});
export const myHelperInfo = TryCatch(async (req, res, next) => {
    const { _id } = req.query;
    const userId = String(_id);
    const helper = await Helper.find({ userId });
    return res.status(201).json({
        success: true,
        helper,
    });
});

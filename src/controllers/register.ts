import { NextFunction,Request,Response } from "express";
import { User } from "../models/user.js";
import { DonorType, FriendType, NewDonorsRequestBody, NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import { Helper } from "../models/helper.js";
import { Donor } from "../models/donor.js";
import { Friend } from "../models/friends.js";

export const newHelper = TryCatch(
    async (
    req:Request, 
    res:Response, 
    next:NextFunction)=> {

        const {id} = req.query;

        const userId = String(id);

        const {name,email,gender,location} = req.body;


        if(!location || !name || !email || !gender){
            return next (new ErrorHandler("Please add all fields",400));
        }

        const helper= await Helper.create({
            name,
            email,
            gender,
            location
        })

        return res.status(201).json({
            success: true,
            message: `Thanks for registering!`,
        });
     
}
);

export const newDonor = TryCatch(
    async (
    req:Request<{},{},DonorType[]>, 
    res:Response, 
    next:NextFunction)=> {
        const {id} = req.query;

        const userId = String(id);
        const donors: DonorType[]= req.body;

        for (const donorData of donors) {
            const { name, email, gender, bloodGroup} = donorData;

            if (!bloodGroup || !name || !email || !gender) {
                return next(new ErrorHandler("Please add all fields", 400));
            }

            const donor = await Donor.create({
                name,
                email,
                gender,
                userId,
                bloodGroup
            });
        }

        return res.status(201).json({
            success: true,
            message: `Thanks for registering!`,
        });
     
}
);

export const newFriend = TryCatch(
    async (
    req:Request<{},{},FriendType[]>, 
    res:Response, 
    next:NextFunction)=> {
        const {id} = req.query;

        const userId = String(id);

        const friends = req.body;


        for (const friendData of friends) {
            const { name, email, gender } = friendData;

            if (!name || !email || !gender) {
                return next(new ErrorHandler("Please add all fields", 400));
            }

            await Friend.create({
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
     
}
);

export const allHelpers = TryCatch(
    async (
    req:Request,
    res:Response, 
    next:NextFunction)=> {
        const {id} = req.query;
        const {location} = req.body;

        const userId = String(id);

        const helpers = await Helper.find({});

        return res.status(201).json({
            success: true,
            helpers,
        });
     
}
);

export const allDonors = TryCatch(
    async (
    req:Request,
    res:Response, 
    next:NextFunction)=> {
        const {id} = req.query;
        const {bloodGroup} = req.body;

        const userId = String(id);

        const donors = await Donor.find({bloodGroup});

        return res.status(201).json({
            success: true,
            donors,
        });
     
}
);

export const allFriends = TryCatch(
    async (
    req:Request,
    res:Response, 
    next:NextFunction)=> {
        const {id} = req.query;

        const userId = String(id);

        const friends = await Friend.find({userId});

        return res.status(201).json({
            success: true,
            friends,
        });
     
}
);

export const myDonors = TryCatch(
    async (
    req:Request,
    res:Response, 
    next:NextFunction)=> {
        const {id} = req.query;

        const userId = String(id);

        const donors = await Donor.find({userId});

        return res.status(201).json({
            success: true,
            donors,
        });
     
}
);

export const myHelperInfo = TryCatch(
    async (
    req:Request,
    res:Response, 
    next:NextFunction)=> {
        const {id} = req.query;

        const userId = String(id);

        const helper = await Helper.find({userId});

        return res.status(201).json({
            success: true,
            helper,
        });
     
}
);
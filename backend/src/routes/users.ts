import express, { Response, Request } from "express";
import User from "../models/user"
import jwt from "jsonwebtoken";
import "dotenv/config";
import { body, check, validationResult } from 'express-validator';
import verifyToken from "../middleware/auth";
const router = express.Router();

router.get("/me",verifyToken,async (req:Request,res:Response) => {
    const userId = req.userId;

    try{
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        res.json(user);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
})


router.post("/register", [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 })
], async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const email = req.body.email;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        user = new User({
            email,
            password,
            firstName,
            lastName,
        });
        await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string
            , {
                expiresIn: "1d"
            });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })
        return res.status(200).json({
            message: "user registered successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something went wrong"
        });
    }
})

export default router;
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Connection to DB
connect();

// Handle login requiest
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        console.log(reqBody);

        const user = await User.findOne({email});

        // check is user is exist
        if(!user){
            return NextResponse.json({error: "user does not exist"}, {status: 400})
        }

        // check if the password is correct
        const validPassword = bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json(
                {error: "Invalid Password"},
                {status: 400}
            )
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json(
            {
                message: "Login successfull",
                success: true
            }
        )
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response;

    } catch (error: any) {
        console.log("Error in login route....", error);
        return NextResponse.json({error: error.message}, {status:500})
    } finally {

    }
}
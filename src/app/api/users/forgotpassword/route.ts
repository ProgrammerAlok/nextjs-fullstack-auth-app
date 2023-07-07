import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";


connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        console.log(reqBody)

        // check if user exists !!
        const user = await User.findOne({email})
        
        if(!user){
            return NextResponse.json({error: "User not found !!"}, {status: 400})
        }

        // send verify email
        await sendEmail({email, emailType: "RESET", userId: user._id})

        console.log('reset password link sent to your mail')
        
        return NextResponse.json({
            message: "reset email send successfully",
            success: true,
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}


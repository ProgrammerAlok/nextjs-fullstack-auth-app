import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { token, password } = reqBody
        console.log(token)
        console.log(password)
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})
        if(!user){
            return NextResponse.json({error: 'invalid token'}, {status: 400})
        }
        else {
            
        }
        console.log(user)

        // hashed password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: 'reset password successfully',
            success: true,
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    } finally {

    }
}
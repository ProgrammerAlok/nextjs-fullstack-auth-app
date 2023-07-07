import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        // create a hash token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)        

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        } else{

        }

        const transport = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: parseInt(process.env.NODEMAILER_PORT!, 10),
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASS
            }
        });

        const mailoptionsForVerifyEmail = {
            from: 'abc@gmai.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'verify your email' : 'reset your password' ,
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" >here</a>
            or copy paste the link in your browser <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }
        const mailoptionsForVerifyForgotPasswordToken = {
            from: 'abc@gmai.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'verify your email' : 'reset your password' ,
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyforgotpasswordtoken?token=${hashedToken}" >here</a>
            or copy paste the link in your browser <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailoptions = emailType === mailoptionsForVerifyEmail ? mailoptionsForVerifyEmail : mailoptionsForVerifyForgotPasswordToken;

        const mailresponse = await transport.sendMail(mailoptions)
        return mailoptions

    } catch (error: any) {
        throw new Error(error.message)
    } finally {

    }
}




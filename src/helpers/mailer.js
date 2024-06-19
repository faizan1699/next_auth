
import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const SendEmail = async ({ email, emailType, userId }) => {

    try {

        const hashToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000 }
            )
        }
        else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                { forgetPasswordToken: hashToken, forgetPasswordTokenExpiry: Date.now() + 3600000 }
            )
        }

        var transport = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "api", // ❌
                pass: "3dc3d0e396821367d55f2d399cf04e26"// ❌
            }
        });

        const mailOption = {
            from: 'faizanrasheed169@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verfiy your email" : "reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashToken}">here</a> to
             ${emailType === "VERIFY" ?
                    "verify your email" :
                    "or copy or paste link below in you browser"}
                   <br> ${process.env.DOMAIN}/verifyemail?token=${hashToken}
                    </p>`,
        }

        const mailResponse = await transporter.sendMail(mailOption)
        return mailResponse;
    }
    catch (error) {
        throw new Error(error.message)
        console.log(error)
    }
}

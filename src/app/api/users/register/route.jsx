
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { SendEmail } from '@/helpers/mailer';

connect();

export async function POST() {

    try {

        const reqBody = await NextResponse.json()
        const { username, email, password } = reqBody;

        console.log(reqBody);

        const user = await User.findOne({ email })
        if (email) {
            return NextResponse.json({ error: "User already exist" },
                { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(passoword, salt);

        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send vefication email

      await SendEmail({email , emailType: "VERIFY" , userId: savedUser._id})

      return NextResponse.json({
        message: "user registerd succesfully",
        success: true,
        savedUser
      })

    }
    catch (error) {

        return NextResponse.json({ error: error.message }, { status: 500 })

    }

}

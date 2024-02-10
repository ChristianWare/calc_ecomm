import EmailVerificationToken from "@/app/models/emailVerificationToken";
import { NewUserRequest } from "@/app/types";
import startDb from "@/app/lib/db";
import UserModel from "@/app/models/userModel";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { sendEmail } from "@/app/lib/email";

export const POST = async (req: Request) => {
  const body = (await req.json()) as NewUserRequest;
  await startDb();

  const newUser = await UserModel.create({
    ...body,
  });

  const token = crypto.randomBytes(36).toString("hex");

  await EmailVerificationToken.create({
    user: newUser._id,
    token,
  });

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fbd895ded3fc77",
      pass: "10a5a3a32d9c23",
    },
  });

  const verificationUrl = `http://localhost:3000/verify?token=${token}&user_d=${newUser._id}`;

  await transport.sendMail({
    from: "verification@nextecom.com",
    to: newUser.email,
    html: `<h1>Please verify your email by clicking on <a href="${verificationUrl}">this link</a></h1>`,
  });

  return NextResponse.json(newUser);
};

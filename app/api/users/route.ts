import startDb from "@/app/lib/db";
import UserModel from "@/app/models/userModel";
import { NewUserRequest } from "@/app/types";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import nodemailer from "nodemailer";

export const POST = async (req: Request) => {
  const body = (await req.json()) as NewUserRequest;
  await startDb();
  const newUser = await UserModel.create({
    ...body,
  });

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fbd895ded3fc77",
      pass: "10a5a3a32d9c23",
    },
  });

  await transport.sendMail({
    from: "verification@nextecom.com",
    to: newUser.email,
    html: `<h1>Please verify your email by clicking on <a href=http://localhost:3000">this link</a></h1>`,
  });

  return NextResponse.json(newUser);
};
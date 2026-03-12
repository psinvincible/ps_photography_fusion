import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();

  if (
    email === process.env.NEXT_PUBLIC_ADMIN_EMAIL &&
    password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({ message: "Login Successfull!" });
    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  }

  return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
}

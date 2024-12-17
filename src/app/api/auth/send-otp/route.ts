import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber || typeof phoneNumber !== "string") {
      console.error("Invalid phone number received:", phoneNumber);
      return NextResponse.json({ message: "Valid phone number is required" }, { status: 400 });
    }

    console.log(`Sending OTP to phone number: ${phoneNumber}`);

    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
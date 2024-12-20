import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { verifyOTP } from "../../../../utils/crypto-utils";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { phoneNumber, otp } = await req.json();

    if (!phoneNumber || !otp) {
      return NextResponse.json({ error: "Phone number and OTP are required." }, { status: 400 });
    }

    const client = await clientPromise!;
    const db = client.db();

    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ phoneNumber });

    if (!user || !user.otpHash || !user.otpCreatedAt) {
      return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 400 });
    }

    const isOTPValid = await verifyOTP(otp, user.otpHash);
    const isOTPExpired =
      Date.now() - new Date(user.otpCreatedAt).getTime() > 10 * 60 * 1000;

    if (!isOTPValid || isOTPExpired) {
      return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 400 });
    }

    const token = jwt.sign({ userId: user._id, phoneNumber }, JWT_SECRET, { expiresIn: "1h" });

    // Clear OTP fields
    await usersCollection.updateOne(
      { phoneNumber },
      { $unset: { otpHash: "", otpCreatedAt: "" } }
    );

    const response = NextResponse.json({ message: "OTP verified successfully." });
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import clientPromise from "../../../../lib/mongodb";
// import { verifyOTP } from "../../../../utils/crypto-utils";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET!;

// export async function POST(req: Request) {
//   try {
//     const { phoneNumber, otp } = await req.json();

//     if (!phoneNumber || !otp) {
//       return NextResponse.json({ error: "Phone number and OTP are required." }, { status: 400 });
//     }

//     const client = await clientPromise;
//     const db = client.db();
//     const usersCollection = db.collection("users");

//     const user = await usersCollection.findOne({ phoneNumber });

//     if (!user || !user.otpHash || !user.otpCreatedAt) {
//       return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 400 });
//     }

//     const isOTPValid = await verifyOTP(otp, user.otpHash);
//     const isOTPExpired =
//       Date.now() - new Date(user.otpCreatedAt).getTime() > 10 * 60 * 1000; // 10 minutes

//     if (!isOTPValid || isOTPExpired) {
//       return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 400 });
//     }

//     const token = jwt.sign({ phoneNumber }, JWT_SECRET, { expiresIn: "1h" });

//     await usersCollection.updateOne(
//       { phoneNumber },
//       { $unset: { otpHash: "", otpCreatedAt: "" } }
//     );

//     return NextResponse.json({ message: "OTP verified successfully.", token });
//   } catch (error) {
//     return NextResponse.json({ error: (error as Error).message }, { status: 500 });
//   }
// }
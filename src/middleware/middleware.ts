import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { runtime } from '@/app/api/testDatabase/route';

const SECRET_KEY = process.env.JWT_SECRET!;
const encoder = new TextEncoder();
const secret = encoder.encode(SECRET_KEY);

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return NextResponse.json({ error: "Invalid or expired token." }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/protected-route"],
  runtime: "nodejs",
};


// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { runtime } from "./app/api/testDatabase/route";
// import { jwtVerify} from 'jose';

// const SECRET_KEY = process.env.JWT_SECRET!;
// const encoder = new TextEncoder();
// const secret = encoder.encode(SECRET_KEY);

// export async function middleware(req: NextRequest) {
//   const token = req.headers.get("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
//   }

//   try {
//     jwt.verify(token, SECRET_KEY);
//     return NextResponse.next();
//   } catch {
//     return NextResponse.json({ error: "Invalid or expired token." }, { status: 401 });
//   }
// }

// export const config = {
//   matcher: ["/api/protected-route"],
//   // runtime: "nodejs",
// };

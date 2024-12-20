import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const { coupleId, firstName1, firstName2 } = await req.json();
    console.log("Received Data: ", { coupleId, firstName1, firstName2});

    if (!coupleId || !firstName1 || !firstName2) {
      return NextResponse.json(
        { success: false, message: "Couple information is missing" },
        { status: 400 }
      );
    }

    const initials = `${firstName1[0].toUpperCase()}${firstName2[0].toUpperCase()}`;
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 random digits
    const uniqueCode = `${initials}${randomDigits}`;

    const client = await clientPromise;
    const db = client.db("weddingRegistry");
    await db.collection("registries").updateOne(
      { coupleId },
      { $set: { uniqueCode } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, uniqueCode });
  } catch (error) {
    console.log("Error in generateCode: ", error);

    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to generate code", 
        error: error instanceof Error ? error.message : "Unknown error  occurred" 
      },
      { 
        status: 500 
      }
    );
  }
}



// import { NextResponse } from "next/server";
// import clientPromise from "../../../../lib/mongodb";
// import { v4 as uuidv4 } from "uuid";

// export async function POST(req: Request) {
//   try {
//     const { coupleId } = await req.json();
//     const client = await clientPromise;
//     const db = client.db("weddingRegistry");

//     const uniqueCode = uuidv4();
//     await db.collection("registries").updateOne(
//       { coupleId },
//       { $set: { uniqueCode } },
//       { upsert: true }
//     );

//     return NextResponse.json({ success: true, uniqueCode });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Failed to generate unique code.", error },
//       { status: 500 }
//     );
//   }
// }

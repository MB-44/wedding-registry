import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const { uniqueCode } = await req.json();
    const client = await clientPromise;
    const db = client.db("weddingRegistry");

    const registry = await db.collection("registries").findOne({ uniqueCode });
    if (!registry) {
      return NextResponse.json({ success: false, message: "Registry not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, registry });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch registry.", error },
      { status: 500 }
    );
  }
}

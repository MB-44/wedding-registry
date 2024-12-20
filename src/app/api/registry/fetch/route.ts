import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uniqueCode = searchParams.get("code");

    if (!uniqueCode) {
      return NextResponse.json(
        { success: false, message: "Unique code is missing" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("weddingRegistry");

    const registry = await db.collection("registries").findOne({ uniqueCode });

    if (!registry) {
      return NextResponse.json(
        { success: false, message: "Registry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, registry });
  } catch (error) {
    console.error("Error fetching registry:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch registry",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
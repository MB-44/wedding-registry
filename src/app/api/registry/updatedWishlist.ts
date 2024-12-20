import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const { uniqueCode, productId } = await req.json();
    const client = await clientPromise;
    const db = client.db("weddingRegistry");

    const result = await db.collection("registries").updateOne(
      { uniqueCode, "wishlist.id": productId },
      { $set: { "wishlist.$.purchased": true } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: "Item not found or already purchased." });
    }

    return NextResponse.json({ success: true, message: "Wishlist updated." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update wishlist.", error },
      { status: 500 }
    );
  }
}

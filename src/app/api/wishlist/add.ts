import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId, productId } = await req.json();

        const client = await clientPromise;
        const db = client.db("weddingRegistry");

        const product = await db.collection("products").findOne({ _id: productId });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        const result = await db.collection("wishlist").updateOne(
            { userId },
            { $addToSet: { items: product } },
            { upsert: true }
        );

        return NextResponse.json({ success: true, result });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

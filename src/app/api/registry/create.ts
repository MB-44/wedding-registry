import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { coupleId, accessCode, weddingDate, deliveryAddress } = await req.json();

        const client = await clientPromise;
        const db = client.db("weddingRegistry");

        const result = await db.collection("registries").insertOne({
            coupleId,
            accessCode,
            weddingDate: new Date(weddingDate),
            deliveryAddress,
            items: [],
        });

        return NextResponse.json({ success: true, registryId: result.insertedId });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

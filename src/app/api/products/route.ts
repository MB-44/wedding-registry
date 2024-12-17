import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_API_URL = process.env.API_URL;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(`${SHOPIFY_API_URL}/products.json`, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ACCESS_TOKEN || "",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products from Shopify API.");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { searchProperties } from "@/lib/actions";

export const revalidate = 3600; // Revalidate every hour

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const properties = await searchProperties(Object.fromEntries(searchParams));

    return NextResponse.json(properties, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

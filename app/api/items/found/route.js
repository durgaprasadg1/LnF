import Item from "@/model/item";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const items = await Item
      .find({ isFound: true })
      .sort({ reportedAt: -1 });

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("GET FOUND ITEMS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

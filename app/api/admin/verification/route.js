import dbConnect from "@/lib/dbConnect";
import Item from "@/model/item";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const items = await Item.find({ isVerified: false })
      .populate("postedBy", "name email phone")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      items,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

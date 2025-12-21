import Item from "@/model/item";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  const items = await Item.find({ isFound: true }).sort({ reportedAt: -1 });
  return NextResponse.json({ items });
}

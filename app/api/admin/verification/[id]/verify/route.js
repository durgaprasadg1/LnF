import dbConnect from "@/lib/dbConnect";
import Item from "@/model/item";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await dbConnect();

  let {id} = await params;
  await Item.findByIdAndUpdate(id, { isVerified: true });

  return NextResponse.json({ success: true });
}

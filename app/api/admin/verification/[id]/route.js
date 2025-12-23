
import dbConnect from "@/lib/dbConnect";
import Item from "@/model/item";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await dbConnect();

  const {id} = await params;
  await Item.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}

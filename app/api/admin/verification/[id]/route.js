import dbConnect from "@/lib/dbConnect";
import Item from "@/model/item";
import { NextResponse } from "next/server";
import { deleteImage } from "@/lib/cloudinary";

export async function DELETE(req, { params }) {
  await dbConnect();

  const { id } = await params;

  // Get the item to retrieve the image filename
  const item = await Item.findById(id);

  if (!item) {
    return NextResponse.json(
      { success: false, error: "Item not found" },
      { status: 404 }
    );
  }

  // Delete image from Cloudinary if it exists
  if (item.itemImage?.filename) {
    await deleteImage(item.itemImage.filename);
  }

  // Delete item from database
  await Item.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}

import dbConnect from "@/lib/dbConnect";
import Item from "@/model/item";
import { NextResponse } from "next/server";
import { deleteImage } from "@/lib/cloudinary";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    const item = await Item.findById(id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 }
      );
    }

    if (item.itemImage?.filename) {
      await deleteImage(item.itemImage.filename);
    }

    await Item.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE ITEM ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import Item from "@/model/item";
import { NextResponse } from "next/server";
import { deleteImages } from "@/lib/cloudinary";
import { userActionSchema } from "@/lib/validationSchemas";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const body = await req.json();

    const validationResult = userActionSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { action } = validationResult.data;

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    if (action === "warn") {
      user.notifications.push(
        `⚠️ Admin Warning: Please follow platform rules.`
      );
      await user.save();

      return NextResponse.json({
        success: true,
        message: "User warned successfully",
      });
    }

    if (action === "block") {
      user.isBlocked = true;
      await user.save();

      return NextResponse.json({
        success: true,
        message: "User blocked successfully",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("ADMIN PATCH ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const userItems = await Item.find({ postedBy: id });
    const imagePublicIds = userItems
      .filter((item) => item.itemImage?.filename)
      .map((item) => item.itemImage.filename);

    if (imagePublicIds.length > 0) {
      await deleteImages(imagePublicIds);
    }

    await Item.deleteMany({ postedBy: id });

    await User.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "User and related data deleted",
    });
  } catch (error) {
    console.error("ADMIN DELETE ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

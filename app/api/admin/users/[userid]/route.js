import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import Item from "@/model/item";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const { action } = await req.json();

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

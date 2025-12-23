import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find()
      .select("name role email phone profilePicture itemsReturned department")
      .sort({ itemsReturned: -1 })
      .lean();

    const performers = users.map((u) => ({
      _id: u._id,
      name: u.name,
      role: u.role,
      email: u.email,
      phone: u.phone,
      department: u.department,
      profilePicture: u.profilePicture?.url || "",
      itemsReturned: u.itemsReturned || 0,
    }));

    return NextResponse.json({ success: true, performers });
  } catch (error) {
    console.error("GET PERFORMERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

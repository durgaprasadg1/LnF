import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import Item from "@/model/item";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    // Admin stats endpoint - protected by layout guards
    const totalUsers = await User.countDocuments();

    const lostRequests = await Item.countDocuments({ isLost: true });
    const foundAnnouncements = await Item.countDocuments({ isFound: true });

    const pendingVerifications = await Item.countDocuments({
      isVerified: false,
    });

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        lostRequests,
        foundAnnouncements,
        pendingVerifications,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

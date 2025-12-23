import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import Item from "@/model/item";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find().lean();

    const usersWithCounts = await Promise.all(
      users.map(async (user) => {
        const lostCount = await Item.countDocuments({
          postedBy: user._id,
          isLost: true,
        });

        const foundCount = await Item.countDocuments({
          postedBy: user._id,
          isFound: true,
        });

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          lostCount,
          foundCount,
          isBlocked: user.isBlocked || false,
        };
      })
    );

    return NextResponse.json({ success: true, users: usersWithCounts });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

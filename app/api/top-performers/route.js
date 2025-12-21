import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import Item from "@/model/item";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const users = await User.find().lean();
  const items = await Item.find({ isResolved: true }).lean();
  const counts = {};

  items.forEach((i) => {
    const uid = i.postedBy.toString();
    counts[uid] = (counts[uid] || 0) + 1;
  });

  const result = users
    .map((u) => ({
      _id: u._id,
      name: u.name,
      role: u.role,
      email: u.email,
      phone: u.phone,
      profilePicture :u.profilePicture.url,
      itemsReturned: counts[u._id.toString()] || 0,
    }))
    .sort((a, b) => b.itemsReturned - a.itemsReturned);

  return NextResponse.json({ performers: result });
}

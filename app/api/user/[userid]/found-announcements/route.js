import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import Item from "@/model/item";
import { adminAuth } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();

  const { userid } = await params;

  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let decoded;
  try {
    decoded = await adminAuth.verifyIdToken(token);
  } catch {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }

  const user = await User.findById(userid);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (user.email !== decoded.email)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const items = await Item.find({ postedBy: userid, isFound: true })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ items });
}

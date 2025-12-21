import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import { adminAuth } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = await adminAuth.verifyIdToken(token);
  const user = await User.findOne({ email: decoded.email }).populate("items");

  return NextResponse.json({ user });
}

export async function POST(req, { params }) {
  await dbConnect();
  const { userid } = await params;
  const body = await req.json();

  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = await adminAuth.verifyIdToken(token);

  const mongoUser = await User.findById(userid);
  if (!mongoUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  // The user model in this project does not store the Firebase UID field.
  // Authorize by comparing the decoded token email with the mongo user's email.
  // (If you later add a `firebaseUID` field to the User model, you can
  // switch this check to compare UIDs instead.)
  if (mongoUser.email !== decoded.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = await User.findByIdAndUpdate(userid, body, {
    new: true,
    runValidators: true,
  });

  return NextResponse.json({ success: true, user: updated });
}

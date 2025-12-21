import dbConnect from "@/lib/dbConnect";
import User from "@/model/user";
import { adminAuth } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { idToken } = await req.json();

  const decoded = await adminAuth.verifyIdToken(idToken);
  const email = decoded.email;
  const name = decoded.name || email.split("@")[0];

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      phone: "",
      role: "student",
      department: "Other",
      items: [],
      itemsReturned: 0,
      token : decoded.user_id,
      profilePicture: {
        url: decoded.picture || "",
        filename: "",
      },
    });
  }

  return NextResponse.json({ user });
}

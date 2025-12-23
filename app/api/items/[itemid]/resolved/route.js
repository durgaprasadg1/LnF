import dbConnect from "@/lib/dbConnect";
import Item from "@/model/item";
import User from "@/model/user";
import { adminAuth } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  await dbConnect();
  const { itemid } = await params;

  try {
    const token = req.headers.get("authorization")?.split("Bearer ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const founderEmail = decoded.email;

    const item = await Item.findById(itemid);
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const founder = await User.findOne({ email: founderEmail });
    if (!founder) {
      return NextResponse.json(
        { error: "Founder user not found in DB" },
        { status: 404 }
      );
    }

    const owner = await User.findById(item.postedBy);
    console.log("Owner : ", owner);
    if (!owner) {
      return NextResponse.json(
        { error: "Owner user not found" },
        { status: 404 }
      );
    }
    const msg = `Your item "${item.itemName}" has been found by ${
      founder.name
    }. Email: ${founder.email} | Phone: ${
      founder.phone
    } | Time: ${new Date().toLocaleString()}`;

    owner.notification.push(msg);

    await owner.save();

    item.isResolved = true;
    await item.save();

    return NextResponse.json({
      success: true,
      owner,
      item,
    });
  } catch (error) {
    console.log("PATCH ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

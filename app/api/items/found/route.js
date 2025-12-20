import Item from "@/model/item";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  await dbConnect();
  const items = await Item.find({ isFound: true }).sort({ reportedAt: -1 });
  return Response.json({ items });
}

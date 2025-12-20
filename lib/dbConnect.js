import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lnf";

  await mongoose.connect(uri, {
    dbName: "lnf",
  });

  isConnected = true;
}

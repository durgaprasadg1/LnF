import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Item from "../model/item.js";
import User from "../model/user.js";

// console.log("Mongo Uri  :  " + process.env.MONGODB_URI)
 mongoose.connect("mongodb://127.0.0.1:27017/lnf");

async function init() {
  const user = await User.findOne();
  if (!user) return;
  

  const sampleItems = [
    {
      itemName: "Red Backpack",
      description: "Lost near library, contains notes and a calculator.",
      lostAt: "Library",
      isLost: true,
      itemImage: {
        url: "/sample/backpack.jpg",
        filename: "backpack.jpg",
      },
      category: "Accessories",
      postedBy: "6946f3d164fc1a52011e2621",
      reportedAt: new Date(),
    },
    {
      itemName: "Samsung Earbuds",
      description: "Found near canteen.",
      foundAt: "Canteen",
      isFound: true,
      itemImage: {
        url: "/sample/earbuds.jpg",
        filename: "earbuds.jpg",
      },
      category: "Electronics",
      postedBy: "6946f3d164fc1a52011e2621",
      reportedAt: new Date(),
    },
    {
      itemName: "ID Card",
      description: "Blue lanyard, belongs to some student.",
      foundAt: "Ground",
      isFound: true,
      itemImage: {
        url: "/sample/idcard.jpg",
        filename: "idcard.jpg",
      },
      category: "Documents",
      postedBy: "6946f3d164fc1a52011e2621",
      reportedAt: new Date(),
    },
    {
      itemName: "Black Wallet",
      description: "Lost somewhere between block A and block C.",
      lostAt: "Block C",
      isLost: true,
      itemImage: {
        url: "/sample/wallet.jpg",
        filename: "wallet.jpg",
      },
      category: "Accessories",
      postedBy: "6946f3d164fc1a52011e2621",
      reportedAt: new Date(),
    },
  ];

  await Item.deleteMany({});
  await Item.insertMany(sampleItems);
  mongoose.connection.close();
}

init();

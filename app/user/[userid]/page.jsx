"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";
import EditProfileModal from "../../Components/User/EditProfileModal";
import { motion } from "framer-motion";
import StatCard from "../../Components/User/StatCard";
import QuickActions from "../../Components/User/QuickActions";
import AchievementBanner from "../../Components/User/AchievementBanner";
export default function ProfilePage() {
  const { user, mongoUser } = useAuth();
  console.log("Mongo User in Profile Page: ", mongoUser);
  const [open, setOpen] = useState(false);

  if (!user || !mongoUser) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-stone-800 text-white rounded-xl p-8 flex gap-6"
      >
        <Image
          src={
            mongoUser.profilePicture?.url ||
            user.photoURL?.url ||
            "/default-user.png"
          }
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full border border-white"
        />

        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold">{mongoUser.name}</h2>
          <p className="text-sm opacity-90">{mongoUser.email}</p>
          <p className="capitalize text-sm mt-1">{mongoUser.role}</p>
          <p className="capitalize text-sm text-white">{mongoUser.phone}</p>
        </div>

        <div className="flex-1" />
        <button
          onClick={() => setOpen(true)}
          className="bg-white text-stone-800 px-4 py-2 rounded-md font-medium hover:bg-gray-200"
        >
          Edit Profile
        </button>
      </motion.div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-10">
        <StatCard
          title="Lost Requests"
          value={mongoUser.items.filter((i) => i.isLost).length}
        />
        <StatCard
          title="Found Announcements"
          value={mongoUser.items.filter((i) => i.isFound).length}
        />
        <StatCard title="Items Returned" value={mongoUser.itemsReturned} />
      </div>
      <QuickActions mongoUser={mongoUser} />
      <AchievementBanner count={mongoUser.itemsReturned} />
      {open && (
        <EditProfileModal open={open} setOpen={setOpen} mongoUser={mongoUser} />
      )}{" "}
    </div>
  );
}

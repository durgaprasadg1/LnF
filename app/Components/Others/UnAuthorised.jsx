"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UnauthorizedBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-20 p-8 rounded-xl border bg-white shadow-sm flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
        <Lock size={32} className="text-stone-700" />
      </div>

      <h2 className="text-2xl font-bold mt-4">Login Required</h2>
      <p className="text-gray-600 mt-2">
        You need to be logged in to access this action.
      </p>

      <Link
        href="/login"
        className="mt-6 bg-stone-800 text-white px-6 py-2 rounded-md hover:bg-black transition"
      >
        Login
      </Link>
    </motion.div>
  );
}

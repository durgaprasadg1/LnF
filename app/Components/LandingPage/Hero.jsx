"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
export default function Hero() {
  const { user, mongoUser } = useAuth();

  return (
    <div className="w-full bg-white mt-15">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          {mongoUser && (
            <><h1 className="mt-2 text-black font-extrabold text-4xl mb-2">
            Welcome back, {mongoUser.name.split(" ")[0]}!
          </h1></>)}
          <h1 className="text-3xl font-bold leading-tight">
            Lost items shouldn't stay lost anymore.
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            A simple college-wide platform to report, find and recover items quickly.
          </p>
          {mongoUser && (
            <>
          <div className="mt-8 flex gap-4">
            <Link href={`/user/${mongoUser._id}/new-lost-request`}>
              <Button size="lg" className="bg-stone-800 text-white hover:bg-black">
                Lost an Item
              </Button>
            </Link>

            <Link href={`/user/${mongoUser._id}/new-found-announcement`}>
              <Button size="lg" variant="outline">
                Found an Item
              </Button>
            </Link>
          </div></>
          )}
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 min-h-5"
        >
          <Image
            src="/boy_img.png"
            alt="Student holding item"
            width={300}
            height={0}
            className="ml-20"
          />
        </motion.div>
      </div>
    </div>
  );
}

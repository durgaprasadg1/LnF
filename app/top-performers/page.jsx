"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function TopPerformers() {
  const [performers, setPerformers] = useState([]);
  const { user, mongoUser } = useAuth();
  console.log(user);
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/top-performers");
      const data = await res.json();
      setPerformers(data.performers || []);
      console.log("Daata: ", data);
    }
    load();
  }, []);

  const top3 = performers.slice(0, 3);
  console.log("top 3 :", top3[0]);
  const others = performers.slice(3);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold">Top Performers</h1>
        <p className="text-gray-600 mt-2">
          Celebrating our community heroes who help reunite lost items with
          their owners
        </p>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-8 justify-items-center mb-16">
        {top3.map((p, index) => {
          const rank = index + 1;
          const isChampion = rank === 1;
          const isSilver = rank === 2;
          const isBronze = rank === 3;

          const cardStyles = isChampion
            ? "bg-yellow-50 border-yellow-300 shadow-xl scale-105"
            : isSilver
            ? "bg-gray-50 border-gray-300"
            : "bg-orange-50 border-orange-300";

          return (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`w-full max-w-xs rounded-xl p-6 border ${cardStyles}`}
            >
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">
                  🏆 {rank} {isChampion ? "Champion" : ""}
                </div>
                <Image height={100} width={100} src={p.profilePicture|| "/default-user.png"} alt={p.name} className="ml-20 rounded-full" />
                <h2 className="text-xl font-semibold">{p.name}</h2>
                <p className="text-gray-700 capitalize">{p.role}</p>

                <div className="text-gray-500 text-sm mt-1">
                  {p.department || "General"}
                </div>

                <div className="mt-6">
                  <div className="text-2xl font-bold">{p.itemsReturned}</div>
                  <div className="text-gray-500 text-sm">Items Returned</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {others.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-4 text-center">
            Other Top Contributors
          </h2>

          <div className="space-y-4">
            {others.map((p, index) => (
              <div
                key={p._id}
                className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full font-bold">
                    🏅 {index + 4}
                  </div>
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-gray-500 capitalize">
                      {p.role}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">{p.itemsReturned}</div>
                  <div className="text-gray-500 text-sm">items</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-16 p-10 rounded-2xl bg-stone-50 text-center">
        <h3 className="text-xl font-semibold mb-4">
          Want to be on the leaderboard?
        </h3>
        <p className="text-gray-600 mb-6">
          Help reunite lost items with their owners and earn your place among
          our top performers!
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/all-lost-requests"
            className="px-6 py-3 bg-stone-800 text-white rounded-md"
          >
            Browse Lost Items
          </Link>
          <Link
            href="/user/sessionid/new-found-announcement"
            className="px-6 py-3 border border-stone-600 text-stone-800 rounded-md"
          >
            Report Found Item
          </Link>
        </div>
      </div>
    </div>
  );
}

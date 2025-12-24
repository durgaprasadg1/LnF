"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import UnauthorizedBox from "../../../Components/Others/UnAuthorised";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import StatBox from "../../../Components/Others/StatBox";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function MyLostRequests() {
  const { userid } = useParams();
  const { user, refreshMongoUser } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolvingItemId, setResolvingItemId] = useState(null);
  const [refreshTick, setRefreshTick] = useState(0);

  const loadLostRequests = useCallback(async () => {
    if (!user) return;

    try {
      const token = await user.getIdToken(true);
      const res = await fetch(`/api/user/${userid}/lost-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        toast.error("Failed to load lost requests");
        setItems([]);
        return;
      }

      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load lost requests");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user, userid]);

  useEffect(() => {
    loadLostRequests();
  }, [loadLostRequests, refreshTick]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTick((prev) => prev + 1);
    }, 15000); 

    return () => clearInterval(interval);
  }, []);

  const handleGotItem = async (itemId) => {
    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    if (
      !confirm(
        "Have you received the item? Click OK to confirm and mark this request as resolved."
      )
    ) {
      return;
    }

    try {
      setResolvingItemId(itemId);
      const token = await user.getIdToken();

      const res = await fetch(`/api/items/${itemId}/resolved`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        toast.error("Failed to mark as resolved");
        return;
      }

      toast.success("Item marked as resolved");
      refreshMongoUser();
      setRefreshTick((prev) => prev + 1); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark item as resolved");
    } finally {
      setResolvingItemId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-gray-800" />
      </div>
    );
  }

  if (!user) return <UnauthorizedBox />;

  const total = items.length;
  const pending = items.filter((i) => !i.isResolved).length;
  const found = items.filter((i) => i.isFound).length;
  const resolved = items.filter((i) => i.isResolved).length;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold">My Lost Requests</h1>
      <p className="text-gray-600 mb-8">
        View and manage your lost item requests
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <StatBox label="Total" value={total} color="bg-stone-100" />
        <StatBox label="Pending" value={pending} color="bg-yellow-50" />
        <StatBox label="Found" value={found} color="bg-blue-50" />
        <StatBox label="Resolved" value={resolved} color="bg-green-50" />
      </div>

      {total === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 border rounded-xl bg-white"
        >
          <h2 className="text-lg font-medium text-gray-700">
            No lost requests yet
          </h2>
          <p className="text-gray-500 mt-1">
            You haven&apos;t reported any lost items
          </p>

          <Link
            href={`/user/${userid}/new-lost-request`}
            className="mt-6 bg-stone-800 text-white px-6 py-2 rounded-md hover:bg-black"
          >
            Report Lost Item
          </Link>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 border rounded-xl bg-white shadow-sm flex gap-4"
            >
              <Image
                src={item.itemImage?.url || "/placeholder.png"}
                height={96}
                width={96}
                alt={item.itemName}
                className="w-24 h-24 rounded-md object-cover"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.itemName}</h3>
                <p className="text-gray-600">
                  Lost at: {item.lostAt || "N/A"}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm rounded-md ${
                    item.isResolved
                      ? "bg-green-100 text-green-700"
                      : item.isFound
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.isResolved
                    ? "Resolved"
                    : item.isFound
                    ? "Found"
                    : "Pending"}
                </span>

                <button
                  onClick={() => handleGotItem(item._id)}
                  disabled={
                    !item.isFound ||
                    item.isResolved ||
                    resolvingItemId === item._id
                  }
                  className="mt-3 bg-green-600 text-white px-3 py-1 rounded
                             hover:bg-green-700
                             disabled:opacity-50
                             disabled:cursor-not-allowed
                             flex items-center gap-2"
                >
                  {resolvingItemId === item._id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Got Item"
                  )}
                </button>

                {!item.isFound && (
                  <p className="text-xs text-gray-500 mt-1">
                    Waiting for someone to mark this item as found
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

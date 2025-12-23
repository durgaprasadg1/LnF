"use client";

import { useEffect, useState } from "react";
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

  const handleGotItem = async (itemId) => {
    try {
      if (
        !confirm(
          "Are you sure to mark this item as found? Your all details will be shared with the owner."
        )
      ) {
        return;
      }

      if (!user) {
        alert("You must be logged in!");
        return;
      }

      setResolvingItemId(itemId);
      const token = await user.getIdToken();

      const res = await fetch(`/api/items/${itemId}/resolved`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Failed to mark as resolved");
        console.log(data.error || "Something went wrong");
      } else {
        console.log("Item marked as resolved:", data);
        toast.success("Item marked as resolved!");
      }
    } catch (error) {
      console.error("Error marking item resolved:", error.message);
      toast.error("Failed to mark as resolved");
    } finally {
      setResolvingItemId(null);
      refreshMongoUser();
    }
  };

  useEffect(() => {
    if (!user) return;

    const loadLostRequests = async () => {
      try {
        const token = await user.getIdToken(true);
        const res = await fetch(`/api/user/${userid}/lost-requests`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 401) {
          toast.error("Unauthorized. Please login again.");
          setItems([]);
          return;
        }
        if (!res.ok) {
          toast.error("Failed to load lost requests");
          setItems([]);
          return;
        }
        const data = await res.json();
        setItems(data.items || []);
      } catch (err) {
        console.error("Failed to load lost requests:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadLostRequests();
  }, [user, userid]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-gray-800 mx-auto mt-20" />
      </div>
    );
  }

  if (!user) return <UnauthorizedBox />;
  const total = items?.length;
  const pending = items?.filter((i) => !i.isResolved).length;
  const found = items?.filter((i) => i.isFound).length;
  const approved = items?.filter((i) => i.isResolved).length;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-semibold">My Lost Requests</h1>
      <p className="text-gray-600 mb-8">
        View and manage your lost item requests
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <StatBox label="Total" value={total} color="bg-stone-100" />
        <StatBox label="Pending" value={pending} color="bg-yellow-50" />
        <StatBox label="Approved" value={approved} color="bg-green-50" />
        <StatBox label="Found" value={found} color="bg-blue-50" />
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
                src={item.itemImage?.url}
                height={96}
                width={96}
                alt="placeholder.png"
                className="w-24 h-24 rounded-md object-cover"
              />

              <div>
                <h3 className="text-lg font-semibold">{item.itemName}</h3>
                <p className="text-gray-600">Lost at: {item.lostAt || "N/A"}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm rounded-md mr-5 ${
                    item.isResolved
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.isFound
                    ? "Found"
                    : item.isResolved
                    ? "Resolved"
                    : "Pending"}
                </span>
                <button
                  onClick={() => handleGotItem(item._id)}
                  disabled={resolvingItemId === item._id}
                  className="p-1 mt-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-25"
                >
                  {resolvingItemId === item._id ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Got Item"
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

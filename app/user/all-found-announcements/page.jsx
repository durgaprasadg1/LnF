"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function AllFoundAnnouncements() {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/items/found");
        const data = await res.json();
        setFoundItems(data.items || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load found items");
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  // ✅ Filter once
  const visibleItems = useMemo(
    () => foundItems.filter((i) => i.isVerified && !i.isResolved),
    [foundItems]
  );

  // ✅ Global loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-700" />
      </div>
    );
  }

  return (
    <>
      {/* Info banner (instead of marquee) */}
      {visibleItems.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-sm px-4 py-2 text-center">
          Found item announcements are visible after admin verification.
          Listings are automatically removed after 10 days.
        </div>
      )}

      {/* Actions */}
      <div className="p-4 flex justify-center gap-4">
        <Link href="/user/new-lost-request">
          <Button className="bg-slate-800 hover:bg-slate-900">
            New Lost Request
          </Button>
        </Link>

        <Link href="/user/new-found-announcement">
          <Button className="bg-slate-800 hover:bg-slate-900">
            New Found Announcement
          </Button>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Found Items
        </h1>

        {/* Empty state */}
        {visibleItems.length === 0 && (
          <div className="w-full flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>

              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                No Found Items Posted
              </h2>

              <p className="text-sm text-gray-600 mb-3">
                There are currently no verified found item announcements.
              </p>

              <p className="text-xs text-gray-500">
                If you have found an item, you can post an announcement.
              </p>
            </div>
          </div>
        )}

        {/* Items grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-6">
          {visibleItems.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-md hover:shadow-lg transition">
                <CardContent className="p-4">
                  <div className="w-full h-52 bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={item.itemImage?.url || "/placeholder.png"}
                      alt={item.itemName}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h2 className="text-xl font-semibold">
                    {item.itemName}
                  </h2>

                  <Badge className="mt-2">{item.category}</Badge>

                  {item.foundAt && (
                    <p className="text-gray-600 mt-3">
                      <strong>Found at:</strong> {item.foundAt}
                    </p>
                  )}

                  <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                    {item.description}
                  </p>

                  <p className="text-gray-400 text-xs mt-3">
                    Posted on{" "}
                    {new Date(item.reportedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AllFoundAnnouncements() {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("/api/items/found");
      const data = await res.json();
      setFoundItems(data.items || []);
      setLoading(false);
    }
    fetchItems();
  }, []);

  return (
    <>
    {foundItems.length > 0 && (<marquee
          behavior="scroll"
          direction="left"
          className="text-stone-900 font-semibold mt-2"
        >
          The item from the listing will be deleted automatically after 10 days.
        </marquee>
    )}
   
    <div className="max-w-6xl mx-auto px-6 py-16">

      <h1 className="text-4xl font-bold mb-10 text-center">
        Found Items
      </h1>

      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin h-10 w-10 text-gray-800" />
        </div>
      )}

      {!loading && foundItems.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No items found posted yet.
        </p>
      )}

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-6">
        {!loading &&
          foundItems.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
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

                  <Badge className="mt-2">
                    {item.category}
                  </Badge>

                  {item.foundAt && (
                    <p className="text-gray-600 mt-3">
                      <strong>Found at:</strong> {item.foundAt}
                    </p>
                  )}

                  <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                    {item.description}
                  </p>

                  <p className="text-gray-400 text-xs mt-4">
                    Posted on: {new Date(item.reportedAt).toLocaleDateString()}
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

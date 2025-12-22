"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function AllLostRequests() {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/items/lost");
        const data = await res.json();
        console.log("DAATA:", data.items[0].postedBy);
        setLostItems(data.items || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center">Lost Items</h1>

      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin h-10 w-10 text-gray-800" />
        </div>
      )}

      {!loading && lostItems.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No lost items reported yet.
        </p>
      )}

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-6">
        {!loading &&
          lostItems.map((item) => (
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

                  <h2 className="text-xl font-semibold">{item.itemName} </h2>

                  <Badge className="mt-2">{item.category}</Badge>

                  {item.lostAt && (
                    <p className="text-gray-600 mt-3">
                      <strong>Lost at:</strong> {item.lostAt}
                    </p>
                  )}

                  <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                    {item.description}
                  </p>

                  <p className="text-gray-400 text-xs mt-2 mb-2">
                    Reported on:{" "}
                    {new Date(item.reportedAt).toLocaleDateString()}
                  </p>
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <Dialog className="mt-2">
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="bg-stone-900 text-white"
                        >
                          Contact Owner
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-106.25">
                        <DialogTitle className="text-black">Name : {item.postedBy?.name}</DialogTitle>
                        <DialogTitle>
                          Phone : {item.postedBy?.phone}
                        </DialogTitle>
                        <DialogTitle>
                          Owner :{" "}
                          <div className="w-full h-52 bg-gray-100 rounded-lg overflow-hidden mb-4">
                            <Image
                              src={item.postedBy?.profilePicture?.url || "/placeholder.png"}
                              alt={
                                item.postedBy?.profilePicture?.url ||
                                "Profile Picture"
                              }
                              width={400}
                              height={400}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </DialogTitle>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                         
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="bg-green-600 text-white">
                      Mark Found
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
    </div>
  );
}

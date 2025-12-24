"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { toast } from "react-toastify";

export default function AllLostRequests() {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingFoundId, setMarkingFoundId] = useState(null);
  const [refreshTick, setRefreshTick] = useState(0);  

  const { user, mongoUser, refreshMongoUser } = useAuth();

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/items/lost");
      const data = await res.json();
      setLostItems(data.items || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load lost items");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems, refreshTick]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTick((prev) => prev + 1);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const visibleItems = useMemo(
    () => lostItems.filter((i) => i.isVerified && !i.isResolved),
    [lostItems]
  );

  const handleMarkFound = async (itemId) => {
    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    const ok = window.confirm(
      "Are you sure you want to mark this item as found? Your contact details will be shared with the owner."
    );
    if (!ok) return;

    try {
      setMarkingFoundId(itemId);

      const token = await user.getIdToken();
      const res = await fetch(`/api/items/${itemId}/found`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success("Item marked as found");
      refreshMongoUser();
      setRefreshTick((prev) => prev + 1); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark item as found");
    } finally {
      setMarkingFoundId(null);
    }
  };

  return (
    <>
      {visibleItems.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm px-4 py-2 text-center mt-2">
          Lost item requests appear after admin verification.
          Listings are automatically removed after 10 days.
        </div>
      )}

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

      {!loading && visibleItems.length === 0 && (
        <div className="w-full flex items-center justify-center py-20 px-4">
          <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-2xl">📭</span>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              No Lost Items Found
            </h2>

            <p className="text-sm text-gray-600 mb-3">
              There are currently no active lost item reports.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
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

                  <h2 className="text-xl font-semibold">{item.itemName}</h2>
                  <Badge className="mt-2">{item.category}</Badge>

                  {item.lostAt && (
                    <p className="text-gray-600 mt-3">
                      <strong>Lost at:</strong> {item.lostAt}
                    </p>
                  )}

                  <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                    {item.description}
                  </p>

                  <p className="text-gray-400 text-xs mt-2 mb-3">
                    Reported on{" "}
                    {new Date(item.reportedAt).toLocaleDateString()}
                  </p>

                  {user && mongoUser ? (
                    <div className="flex justify-between gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-stone-900 text-white">
                            Contact Owner
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md">
                          <DialogTitle>
                            {item.postedBy?.name}
                          </DialogTitle>
                          <p className="text-sm">
                            Phone: {item.postedBy?.phone}
                          </p>

                          <div className="w-full h-52 bg-gray-100 rounded-lg overflow-hidden mt-4">
                            <Image
                              src={
                                item.postedBy?.profilePicture?.url ||
                                "/placeholder.png"
                              }
                              alt="Owner"
                              width={400}
                              height={400}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Close</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        disabled={
                          item.isResolved ||
                          markingFoundId === item._id
                        }
                        onClick={() => handleMarkFound(item._id)}
                      >
                        {markingFoundId === item._id ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing
                          </>
                        ) : (
                          "Mark Found"
                        )}
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm font-semibold mt-2">
                      Log in to help the owner
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

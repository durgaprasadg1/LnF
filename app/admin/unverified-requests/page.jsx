"use client";

import { useEffect, useState } from "react";
import DataTable from "../../Components/Others/Datatables";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { toast } from "react-toastify";

export default function VerificationPage() {
  const [items, setItems] = useState([]);
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/admin/verification");
      const data = await res.json();
      if (data.success) setItems(data.items);
    } catch {
      toast.error("Failed to load requests");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleVerify = async (id) => {
    try {
      await fetch(`/api/admin/verification/${id}/verify`, {
        method: "PATCH",
      });
      toast.success("Request verified");
      fetchItems();
    } catch {
      toast.error("Verification failed");
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Reject and delete this request?")) return;
    try {
      await fetch(`/api/admin/verification/${id}`, {
        method: "DELETE",
      });
      toast.success("Request rejected");
      fetchItems();
    } catch {
      toast.error("Rejection failed");
    }
  };

 const columns = [
  {
    header: "Item Name",
    accessorKey: "itemName",
    cell: ({ getValue }) => (
      <span className="font-semibold">{getValue() || "—"}</span>
    ),
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-300">{getValue()}</span>
    ),
  },
  {
    header: "Type",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-xs rounded-md ${
          row.original.isLost
            ? "bg-red-500/20 text-red-400"
            : "bg-green-500/20 text-green-400"
        }`}
      >
        {row.original.isLost ? "Lost" : "Found"}
      </span>
    ),
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ getValue }) => (
      <p className="max-w-xs line-clamp-2 text-sm text-gray-300">
        {getValue() || "—"}
      </p>
    ),
  },
  {
    header: "Posted By",
    accessorFn: (row) => row.postedBy?.name || "—",
  },
  {
    header: "Email",
    accessorFn: (row) => row.postedBy?.email || "—",
  },
  {
    header: "Phone",
    accessorFn: (row) => row.postedBy?.phone || "—",
  },
  {
    header: "Image",
    cell: ({ row }) =>
      row.original.itemImage?.url ? (
        <Button
          size="sm"
          variant="outline"
          className="bg-transparent text-white"
          onClick={() => {
            setSelectedImage(row.original.itemImage.url);
            setImageOpen(true);
          }}
        >
          View
        </Button>
      ) : (
        <span className="text-gray-400">N/A</span>
      ),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          size="sm"
          className="bg-green-600 text-white"
          onClick={() => handleVerify(row.original._id)}
        >
          Verify
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => handleReject(row.original._id)}
        >
          Reject
        </Button>
      </div>
    ),
  },
];



  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-black p-4 sm:p-6 text-white">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">
        Unverified Lost & Found Requests
      </h1>

      <div className="overflow-x-auto">
        <DataTable columns={columns} data={items} />
      </div>

      <Dialog open={imageOpen} onOpenChange={setImageOpen}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Item Image</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative w-full h-72 sm:h-96">
              <Image
                src={selectedImage}
                alt="Item"
                fill
                className="object-contain rounded-md"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

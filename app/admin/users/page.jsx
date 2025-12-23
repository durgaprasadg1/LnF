"use client";
import { useEffect, useState } from "react";
import DataTable from "../../Components/Others/Datatables"
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    if (data.success) setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleWarn = async (id) => {
  try {
   await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "warn" }),
    });

    if (!res.ok) throw new Error("Failed to warn user");

    toast.success("User has been warned");
  } catch (error) {
    console.error(error);
    toast.error(error.message || "Something went wrong");
  }
};

const handleBlock = async (id) => {
  try {
   await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "block" }),
    });

    if (!res.ok) throw new Error("Failed to block user");

    toast.success("User has been blocked");
    fetchUsers();
  } catch (error) {
    console.error(error);
    toast.error(error.message || "Something went wrong");
  }
};

const handleDelete = async (id) => {
  try {
    if (!confirm("Are you sure you want to delete this user?")) return;

    await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete user");

    toast.success("User deleted successfully");
    fetchUsers();
  } catch (error) {
    console.error(error);
    toast.error(error.message || "Something went wrong");
  }
};

  const columns = [
    { accessorKey: "name", header: "Name"  },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    {
      accessorKey: "lostCount",
      header: "Lost Requests",
    },
    {
      accessorKey: "foundCount",
      header: "Found Announcements",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => handleWarn(user._id)}>
              Warn
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBlock(user._id)}
              className="bg-yellow-500 hover:bg-yellow-600 border-0 hover:text-white"
            >
              Block
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-black px-8 py-10">

        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-white">All Users</h1>

        <DataTable columns={columns} data={users} />
        </div> 
    </div>
  );
}

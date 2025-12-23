"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  PackageSearch,
  PackageCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import ActionCard from "../Components/Admins/Reusables/ActionCard";
import StatCard from "../Components/Admins/Reusables/StatBox";
import { toast } from "react-toastify";

const AdminPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const adminSession = localStorage.getItem("adminSession");
        if (!adminSession) {
          toast.error("Admin session not found");
          return;
        }

        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        if (!res.ok) {
          toast.error("Something went wrong while fetching stats");
          console.error("Error fetching stats:", data.error);
        }
        setStats(data.data);
      } catch (error) {
        toast.error("Failed to fetch admin stats");
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white ">
        <Loader2 className="font-medium animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-black px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 mt-1">Live overview of platform activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Users" value={stats.totalUsers} Icon={Users} />
        <StatCard
          title="Lost Requests"
          value={stats.lostRequests}
          Icon={PackageSearch}
        />
        <StatCard
          title="Found Announcements"
          value={stats.foundAnnouncements}
          Icon={PackageCheck}
        />
        <StatCard
          title="Pending Verifications"
          value={stats.pendingVerifications}
          Icon={AlertCircle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActionCard
          title="User Management"
          desc="View users, block accounts, review activity."
          btn="Manage Users"
          link="/admin/users"
        />
        <ActionCard
          title="Lost & Found Moderation"
          desc="Verify items and resolve disputes."
          btn="Review Requests"
          link="/admin/lost-and-found"
        />
      </div>
    </div>
  );
};

export default AdminPage;

"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "../Components/Others/Navbar";

export default function UserLayout({ children }) {
  const { user, admin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in, redirect to admin
    const adminSession = localStorage.getItem("adminSession");
    if (adminSession) {
      router.push("/admin");
      return;
    }

    // Check if regular user is logged in
    if (!user) {
      router.push("/login");
      return;
    }
  }, [user, admin, router]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import Navbar from "@/app/Components/NonUser/Navbar";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleAdminLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password || !secret) {
        toast.error("All fields are required");
        return;
      }

      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, secret }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Admin login failed");
        return;
      }

      localStorage.setItem("adminSession", JSON.stringify(data.admin));
      toast.success("Admin logged in");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Admin login error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-white">
      
      <div className="w-full max-w-md p-8 border rounded-xl shadow bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">
          Admin Login
        </h1>

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Admin secret key"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            required
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white hover:bg-slate-950"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </Button>
        </form>
      </div>
    </div>
    </>

  );
}

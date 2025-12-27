"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import Navbar from "@/app/Components/NonUser/Navbar";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function AdminRegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secret: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAdminSignup(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error || "Admin creation failed");
        return;
      }

      toast.success("Admin created successfully");
      router.push("/admin/login");
    } catch {
      toast.error("Server error while creating admin");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {" "}
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow border">
          <h1 className="text-2xl font-bold text-center text-slate -800 mb-2">
            Admin Registration
          </h1>

          <p className="text-xs text-center text-gray-600 mb-6">
            Requires admin secret
          </p>

          <form onSubmit={handleAdminSignup} className="space-y-4">
            <Input
              placeholder="Admin name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
              type="email"
              placeholder="Admin email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 8 chars)"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={18} />
                ) : (
                  <AiOutlineEye size={18} />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showSecret ? "text" : "password"}
                placeholder="Admin secret"
                value={form.secret}
                onChange={(e) => setForm({ ...form, secret: e.target.value })}
              />
              <button
                type="button"
                aria-label={showSecret ? "Hide secret" : "Show secret"}
                onClick={() => setShowSecret((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showSecret ? (
                  <AiOutlineEyeInvisible size={18} />
                ) : (
                  <AiOutlineEye size={18} />
                )}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-800 text-white hover:bg-slate-950"
            >
              {loading ? "Creating Admin..." : "Create Admin"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

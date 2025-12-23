"use client";

import { useState, useEffect } from "react";
import { signup } from "@/actions/signup";
import { googleSignin } from "@/actions/googleSignin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import Navbar from "@/app/Components/NonUser/Navbar";

export default function SignupPage() {
  const { user, mongoUser } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
    secret: "",
  });
  const [adminLoading, setAdminLoading] = useState(false);

  useEffect(() => {
    if (user && mongoUser) router.push("/");
  }, [user, mongoUser, router]);


  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        toast.error("Invalid email address");
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }

      await signup(email, password);
      toast.success("Account created successfully");
      router.push("/");
    } catch (err) {
      toast.error(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setLoading(true);
    try {
      await googleSignin();
      router.push("/");
    } catch {
      toast.error("Google signup failed");
    } finally {
      setLoading(false);
    }
  }


  async function handleAdminSignup(e) {
    e.preventDefault();
    setAdminLoading(true);

    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminForm),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error || "Admin creation failed");
        return;
      }

      toast.success("Admin created successfully");
      setAdminForm({ name: "", email: "", password: "", secret: "" });
      router.push("/login");
    } catch {
      toast.error("Server error while creating admin");
    } finally {
      setAdminLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-12 bg-gray-50">

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow border">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create User Account
          </h1>

          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white hover:bg-black"
            >
              {loading ? "Creating..." : "Sign Up"}
            </Button>
          </form>

          <div className="my-1 text-center text-gray-500">OR</div>

          <Button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border bg-white text-black hover:bg-gray-800 hover:text-white"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>

        {/* ADMIN SIGNUP */}
        <div className="w-full max-w-md bg-slate-100 p-8 rounded-xl shadow border">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-2">
            Admin Registration
          </h2>

          <p className="text-xs text-center text-gray-600 mb-6">
            Requires admin secret. Email/password only.
          </p>

          <form onSubmit={handleAdminSignup} className="space-y-4">
            <Input
              placeholder="Admin name"
              value={adminForm.name}
              onChange={(e) =>
                setAdminForm({ ...adminForm, name: e.target.value })
              }
              required
            />
            <Input
              type="email"
              placeholder="Admin email"
              value={adminForm.email}
              onChange={(e) =>
                setAdminForm({ ...adminForm, email: e.target.value })
              }
              required
            />
            <Input
              type="password"
              placeholder="Password (min 8 chars)"
              value={adminForm.password}
              onChange={(e) =>
                setAdminForm({ ...adminForm, password: e.target.value })
              }
              required
            />
            <Input
              type="password"
              placeholder="Admin secret"
              value={adminForm.secret}
              onChange={(e) =>
                setAdminForm({ ...adminForm, secret: e.target.value })
              }
              required
            />

            <Button
              type="submit"
              disabled={adminLoading}
              className="w-full bg-red-600 text-white hover:bg-red-700"
            >
              {adminLoading ? "Creating Admin..." : "Create Admin"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

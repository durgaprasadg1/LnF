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
      await googleSignin({ create: true });
      router.push("/");
    } catch {
     console.error("Google signup error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow border">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h1>

          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white hover:bg-black"
            >
              {loading ? "Creating..." : "Sign Up"}
            </Button>
          </form>

          <div className="my-2 text-center text-gray-500">OR</div>

          <Button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 
              border bg-white text-black 
              hover:bg-gray-800 hover:text-white"
          >
            <FcGoogle size={20} />
            Sign In with Google
            
          </Button>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>

          <p className="mt-2 text-sm text-center">
            <a href="/admin/register" className="text-red-600">
              Admin Registration →
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

"use client";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/login";
import { googleSignin } from "@/actions/googleSignin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import Navbar from "@/app/Components/NonUser/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, mongoUser } = useAuth();

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const pwdRegex = /^.{6,}$/;
      if (!emailRegex.test(email)) {
        toast.error("Enter a valid email address");
        setLoading(false);
        return;
      }
      if (!pwdRegex.test(password)) {
        toast.error("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
      await login(email, password);
    } catch (err) {
      console.log("Error while Login : ", err);
    }
    setLoading(false);
  }

  async function handleAdminLogin(e) {
    e.preventDefault();
    setAdminLoading(true);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(adminEmail)) {
        toast.error("Enter a valid email address");
        setAdminLoading(false);
        return;
      }

      if (!adminPassword || adminPassword.length < 8) {
        toast.error("Password must be at least 8 characters");
        setAdminLoading(false);
        return;
      }

      if (!adminSecret) {
        toast.error("Admin secret is required");
        setAdminLoading(false);
        return;
      }

      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
          secret: adminSecret,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Admin login failed");
      } else {
        toast.success("Admin logged in successfully!");
        // Store admin session in localStorage
        localStorage.setItem("adminSession", JSON.stringify(data.admin));
        router.push("/admin");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      toast.error("Error logging in as admin");
    } finally {
      setAdminLoading(false);
    }
  }

  useEffect(() => {
    if (user && mongoUser) {
      router.push("/");
    }
  }, [user, mongoUser, router]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center gap-8 px-4">
        {/* User Login */}
        <div className="w-full max-w-md p-8 border rounded-xl shadow">
          <h1 className="text-3xl font-bold mb-6 text-center">User Login</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full bg-gray-700 text-white hover:bg-black"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="my-2 text-center text-gray-500">OR</div>

          <Button
            onClick={async () => {
              setLoading(true);
              try {
                await googleSignin();
              } catch (err) {
                console.log("Login Error : ", err);
              }
              setLoading(false);
            }}
            className="w-full flex items-center justify-center gap-3 
        border border-gray-300 rounded-lg py-2.5 
        bg-white text-black 
        hover:bg-stone-800 hover:text-white transition-colors"
            disabled={loading}
          >
            <FcGoogle />
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-gray-600">
            New user?{" "}
            <a href="/register" className="text-blue-600">
              Create an account
            </a>
          </p>
        </div>

        {/* Admin Login */}
        <div className="w-full max-w-md p-8 border rounded-xl shadow bg-red-50">
          <h1 className="text-3xl font-bold mb-6 text-center text-red-600">
            Admin Login
          </h1>
          <p className="text-xs text-gray-600 mb-4 text-center">
            Admin login requires email, password, and secret key
          </p>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Admin email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Admin secret"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full bg-red-600 text-white hover:bg-red-700"
              disabled={adminLoading}
            >
              {adminLoading ? "Logging in..." : "Admin Login"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

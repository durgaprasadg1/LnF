"use client";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/login";
import { googleSignin } from "@/actions/googleSignin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, mongoUser } = useAuth();
  

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      console.log("Error while Login : ", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (user && mongoUser) {
      router.push("/");
    }
  }, [user, mongoUser, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 border rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

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
              router.push("/");
            } catch (err) {
              // Error is handled by toast in the googleSignin action
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
    </div>
  );
}

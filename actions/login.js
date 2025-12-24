import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-toastify";
import { getAuthErrorMessage } from "@/lib/authErrors";

export async function login(email, password) {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const token = await cred.user.getIdToken();

    const res = await fetch("/api/auth/sync", {
      method: "POST",
      body: JSON.stringify({ idToken: token }),
    });

    const data = await res.json();

    if (!res.ok || !data.user) {
      await signOut(auth);
      toast.error("Account not registered. Please register before logging in.");
      console.log(data?.error || "User not registered");
    }

    toast.success("Logged in successfully");
    return data;
  } catch (err) {
    const errorMessage = getAuthErrorMessage(err);
    console.log("Signin error", errorMessage)
  }
}

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { toast } from "react-toastify";
import { getAuthErrorMessage } from "@/lib/authErrors";

export async function googleSignin(options = { create: false }) {
  try {
    const cred = await signInWithPopup(auth, googleProvider);
    const token = await cred.user.getIdToken();

    const res = await fetch("/api/auth/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: token, create: options.create }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      await signOut(auth);
      const message = data?.error || `Sign-in failed (${res.status})`;
      if (res.status === 403) {
        toast.error(
          "Account not registered. Please register before logging in."
        );
      } else {
        toast.error(message);
      }
      console.log("Auth sync error:", data || message);
      return null;
    }

    if (!data.user) {
      await signOut(auth);
      toast.error("Account not registered. Please register before logging in.");
      return null;
    }

    toast.success("Logged in with Google");
    return data;
  } catch (err) {
    toast.error("An error occured while signing you with google");
    console.log(err);
    const errorMessage = getAuthErrorMessage(err);
    console.log(errorMessage);
  }
}

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
      body: JSON.stringify({ idToken: token, create: options.create }),
    });

    const data = await res.json();

    if (!res.ok || !data.user) {
      await signOut(auth);
      toast.error("Account not registered. Please register before logging in.");
      console.log(data?.error || "User not registered");
      return ;
    }

    toast.success("Logged in with Google");
    return data;
  } catch (err) {
    toast.error("An error occured while signing you with google")
    const errorMessage = getAuthErrorMessage(err);
    console.log(errorMessage);
    
  }
}

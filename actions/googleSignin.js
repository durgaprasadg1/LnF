import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { toast } from "react-toastify";
import { getAuthErrorMessage } from "@/lib/authErrors";

export async function googleSignin() {
  try {
    const cred = await signInWithPopup(auth, googleProvider);
    const token = await cred.user.getIdToken();

    const res = await fetch("/api/auth/sync", {
      method: "POST",
      body: JSON.stringify({ idToken: token }),
    });

    const data = await res.json();
    toast.success("Logged in with Google");
    return data;
  } catch (err) {
    const errorMessage = getAuthErrorMessage(err);
    toast.error(errorMessage);
    throw err;
  }
}

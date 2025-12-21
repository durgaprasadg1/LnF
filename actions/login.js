import { signInWithEmailAndPassword } from "firebase/auth";
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
    toast.success("Logged in successfully");
    return data;
  } catch (err) {
    const errorMessage = getAuthErrorMessage(err);
    toast.error(errorMessage);
    throw err;
  }
}

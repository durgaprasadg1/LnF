import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-toastify";
import { getAuthErrorMessage } from "@/lib/authErrors";

export async function logout() {
  try {
    await signOut(auth);
    toast.success("Logged out successfully");
  } catch (err) {
    const errorMessage = getAuthErrorMessage(err);
    toast.error(errorMessage);
    throw err;
  }
}

"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
      <ToastContainer position="top-right" />
    </AuthProvider>
  );
}
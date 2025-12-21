"use client";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setMongoUser(null);
        return;
      }

      setUser(u);

      const token = await u.getIdToken();
      const res = await fetch("/api/auth/sync", {
        method: "POST",
        body: JSON.stringify({ idToken: token }),
      });

      const data = await res.json();
      setMongoUser(data.user);
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, mongoUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

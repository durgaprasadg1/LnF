"use client";
import Hero from "./Components/LandingPage/Hero";
import ActionCards from "./Components/LandingPage/ActionCards";
import Stats from "./Components/LandingPage/Stats";
import Footer from "./Components/LandingPage/Footer";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
    const { user, mongoUser } = useAuth();
  console.log("Current User:", user);
  console.log("MongoDB User Data:", mongoUser);
  return (
    <main>
      <Hero />
      <ActionCards />
      <Stats />
      <Footer />
    </main>
  );
}

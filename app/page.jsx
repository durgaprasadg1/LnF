"use client";
import Hero from "./Components/LandingPage/Hero";
import ActionCards from "./Components/LandingPage/ActionCards";
import Stats from "./Components/LandingPage/Stats";
import Footer from "./Components/LandingPage/Footer";
import Navbar from "./Components/NonUser/Navbar";
import { useAuth } from "@/context/AuthContext";
import AccountBlockedBox from "./Components/Others/AccountBlockedBox";

export default function Home() {
  const { user, mongoUser } = useAuth();
  if(mongoUser?.isBlocked){
    return <><AccountBlockedBox/></>
  }
  return (
    <main>
      <Navbar/>
      <Hero />
      <ActionCards />
      <Stats />
      <Footer />
    </main>
  );
}

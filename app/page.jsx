"use client";
import Hero from "./Components/LandingPage/Hero";
import ActionCards from "./Components/LandingPage/ActionCards";
import Stats from "./Components/LandingPage/Stats";
import Footer from "./Components/LandingPage/Footer";
import Link from "next/link";
import Navbar from "./Components/NonUser/Navbar";


export default function Home() {
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

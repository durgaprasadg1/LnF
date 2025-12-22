"use client";
import Hero from "./Components/LandingPage/Hero";
import ActionCards from "./Components/LandingPage/ActionCards";
import Stats from "./Components/LandingPage/Stats";
import Footer from "./Components/LandingPage/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ActionCards />
      <Stats />
      <Footer />
    </main>
  );
}

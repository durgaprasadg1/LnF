"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import InfoCard from "../Components/User/InfoCard";
export default function UserHomePage() {
  const { user, mongoUser } = useAuth();

  return (
    <>
     {mongoUser?.phone === "" && <marquee behavior="scroll" direction="left">  Please{" "}
              <span className="font-semibold">Complete your Profile</span> to
              get the best experience.</marquee> }
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-100 px-4 sm:px-8 py-16">
     
      <div className="max-w-6xl mx-auto">
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
            A Trusted Way to Reunite Lost Items with Their Owners
          </h1>

          <p className="mt-6 text-gray-600 text-base sm:text-lg">
            This platform is built to help students and staff report lost items,
            announce found belongings, and connect responsibly within the
            community. Our goal is simple — reduce losses, improve trust, and
            make item recovery easier for everyone.
          </p>

          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Every request is verified, communication is secure, and the process
            is designed to be transparent and reliable.
          </p>

          {/* Auth-based Actions */}
          {!user ? (
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-stone-800 text-white hover:bg-black"
                >
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            mongoUser && (
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link href={`/user/${mongoUser._id}/new-lost-request`}>
                  <Button
                    size="lg"
                    className="bg-stone-800 text-white hover:bg-black"
                  >
                    Lost an Item
                  </Button>
                </Link>

                <Link href={`/user/${mongoUser._id}/new-found-announcement`}>
                  <Button size="lg" variant="outline">
                    Found an Item
                  </Button>
                </Link>
              </div>
            )
          )}
        </section>

        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <InfoCard
            title="Clear Reporting"
            text="Post lost or found items with accurate details and images to improve identification and recovery."
          />
          <InfoCard
            title="Verified Requests"
            text="All listings go through a verification process to maintain trust and prevent misuse."
          />
          <InfoCard
            title="Safe Communication"
            text="Contact between users is controlled and transparent, encouraging responsible item exchange."
          />
        </section>
      </div>
    </div>
    </>
  );
}



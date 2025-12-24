"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Upload,
  Bell,
  CheckCircle,
  User,
} from "lucide-react";
import Navbar from "../Components/NonUser/Navbar";
import Step from "../Components/Others/Step";
export default function HowToUsePage() {
  const { user,mongoUser } = useAuth();
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-100  ">
      <Navbar/>
      <div className="max-w-5xl mx-auto mt-5">
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            How to Use Lost & Found
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            A simple, transparent process to help you recover or return lost
            items responsibly.
          </p>
        </div>

        <div className="space-y-12">
          <Step
            icon={<User />}
            title="1. Create an Account"
            description="Sign up or log in to access all features. An account helps keep communication safe and verified."
          >
            <Link href="/register">
              <Button className="mt-4 bg-gray-800 text-white hover:bg-black">
                Create Account
              </Button>
            </Link>
          </Step>

          <Step
            icon={<Upload />}
            title="2. Report a Lost or Found Item"
            description="If you lost something, create a Lost Request. If you found an item, post a Found Announcement with clear details and an image."
          >
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href={`/user/${mongoUser?._id}/new-lost-request`}>
                <Button variant="outline">Report Lost</Button>
              </Link>
              <Link href={`/user/${mongoUser?._id}/new-found-announcement`}>
                <Button variant="outline">Report Found</Button>
              </Link>
            </div>
          </Step>

          <Step
            icon={<Search />}
            title="3. Browse Listings"
            description="Check all lost and found listings. Use filters and search to quickly find matching items."
          >
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/user/all-lost-requests">
                <Button variant="outline">View Lost Items</Button>
              </Link>
              <Link href="/user/all-found-announcements">
                <Button variant="outline">View Found Items</Button>
              </Link>
            </div>
          </Step>

          <Step
            icon={<Bell />}
            title="4. Get Notifications"
            description="When someone marks your item as found or contacts you, you’ll receive a notification inside the app."
          />
          
          <Step
            icon={<CheckCircle />}
            title="5. Verify & Close the Case"
            description="Once the item is returned, mark it as resolved. This keeps the platform clean and trustworthy."
          />
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-sm border p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Important Guidelines
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Always provide accurate and honest information.</li>
            <li>Upload clear images to help identification.</li>
            <li>Never share sensitive personal details publicly.</li>
            <li>Meet in safe, public places when returning items.</li>
            <li>Respect community rules to avoid account actions.</li>
          </ul>
        </div>

        <div className="mt-14 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            Ready to get started?
          </h3>
          <p className="text-gray-600 mt-2">
            Help reunite people with their belongings.
          </p>
          <Link href="/">
            <Button className="mt-4 bg-gray-800 text-white hover:bg-black mb-72">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}



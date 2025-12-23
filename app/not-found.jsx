"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-16">
      <div className="max-w-6xl mx-1 ml-20 grid grid-cols-1 md:grid-cols-2  items-center">
        
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Page Not Found
          </h1>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            The page you’re looking for doesn’t exist or may have been moved.
            Don’t worry—your journey doesn’t end here.
          </p>

          <p className="mt-3 text-gray-600">
            If you were trying to report or find an item, head back to the main
            area and continue from there.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/">
              <Button className="bg-stone-800 text-white hover:bg-black">
                Go to Home
              </Button>
            </Link>
            <Link href="/how-to-use">
              <Button variant="outline">
                How to Use
              </Button>
            </Link>
          </div>
        </div>

     
        <div className="relative h-64 sm:h-80 md:h-96">
          <Image
            src="/404-boy.png"
            alt="Page not found illustration"
            fill
            priority
            className="object-contain rounded"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) =>
    pathname === path
      ? "bg-gray-200 text-black px-3 py-1 rounded-md"
      : "hover:bg-gray-100 px-3 py-1 rounded-md";

  return (
    <nav className="w-full border-b bg-white ">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between w-full">

        <Link href="/" className="flex items-center ">
          <span className="font-semibold text-xl">{`<LnF>`}</span>
        </Link>

        <div className="hidden md:flex flex-1 justify-center gap-8 text-gray-700 font-medium">
          <Link href="/" className={isActive("/")}>Home</Link>
          <Link href="/all-lost-requests" className={isActive("/all-lost-requests")}>
            All Lost Items
          </Link>
          <Link href="/all-found-announcements" className={isActive("/all-found-announcements")}>
            All Found Items
          </Link>
          
          <Link href="/top-performers" className={isActive("/top-performers")}>
            Top Performers
          </Link>
        </div>

        <div className="hidden md:flex gap-4">
          <Button variant="outline">Login</Button>
          <Button className="bg-gray-700 text-white hover:bg-black">Sign Up</Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu size={28} />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-6 text-lg font-medium">
                <Link href="/" className={isActive("/")}>Home</Link>
                <Link href="/all-lost-requests" className={isActive("/all-lost-requests")}>
                  All Lost Items
                </Link>
                <Link href="/all-found-announcements" className={isActive("/all-found-announcements")}>
                  All Found Items
                </Link>
                <Link href="/user/sessionid/new-lost-request" className={isActive("/user/sessionid/new-lost-request")}>
                  Report Lost
                </Link>
                <Link href="/user/sessionid/new-found-announcement" className={isActive("/user/sessionid/new-found-announcement")}>
                  Found new item
                </Link>
                <Link href="/top-performers" className={isActive("/top-performers")}>
                  Top Performers
                </Link>
              </div>

              <div className="mt-10 flex flex-col gap-4">
                <Button variant="outline">Login</Button>
                <Button className="bg-gray-700 text-white hover:bg-black">Sign Up</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}

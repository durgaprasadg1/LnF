"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Menu, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/actions/logout";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, mongoUser } = useAuth();
  console.log("Mongo User in Navbar: ", mongoUser);
  let mongoUserId = mongoUser?._id;
  const isActive = (path) =>
    pathname === path
      ? "bg-gray-200 text-black px-3 py-1 rounded-md"
      : "hover:bg-gray-100 px-3 py-1 rounded-md";

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between w-full">

        <Link href="/" className="flex items-center">
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
          {!user ? (
            <>
              <Link href="/login">

                <Button variant="outline">
                  <LogIn />

                  Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gray-700 text-white hover:bg-black">
                  
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <div className="">
              <Link href={`/user/${mongoUserId}`} className="mr-2">
                <Button variant="outline">
                  <UserIcon className="text-black"/>
                  {user?.displayName?.split(" ")[0] || "Profile"}
                </Button>
              </Link>
              <Button onClick={handleLogout} className="bg-stone-800 text-white">
                <LogOut/>
                Logout
              </Button>
            </div>
          )}
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
                <Link href="/top-performers" className={isActive("/top-performers")}>
                  Top Performers
                </Link>
              </div>

              <div className="mt-10 flex flex-col gap-4">
                {!user ? (
                  <>
                    <Link href="/login">
                      <Button variant="outline">Login</Button>
                    </Link>
                    <Link href="/register">
                      <Button className="bg-gray-700 text-white hover:bg-black">
                        Register
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="ml-2 ">
                    <Link href={`/user/${user.uid}`}>
                      <Button variant="outline" className="mb-2">
                        {mongoUser?.name?.split(" ")[0] || "Profile"}
                      </Button>
                    </Link>
                    <br/>
                    <Button
                      onClick={handleLogout}
                      className="bg-stone-800 text-white hover:bg-stone-900"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}

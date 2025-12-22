"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BellIcon, LogIn, LogOut, Menu, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/actions/logout";
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, mongoUser } = useAuth();
  const { refreshMongoUser } = useAuth();
  console.log("Mongo User Notification", mongoUser?.notification);

  const [notifyOpen, setNotifyOpen] = useState(false);
  const mongoUserId = mongoUser?._id;

  const isActive = (path) =>
    pathname === path
      ? "bg-gray-200 text-black px-3 py-1 rounded-md"
      : "hover:bg-gray-100 px-3 py-1 rounded-md";

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  async function deleteNotificationAt(revIndex) {
    if (!mongoUser?.notification || !user) return;
    const origIndex = mongoUser.notification.length - 1 - revIndex;
    const newNotifications = [...mongoUser.notification];
    newNotifications.splice(origIndex, 1);
    try {
      const token = await user.getIdToken();
      await fetch(`/api/user/${mongoUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notification: newNotifications }),
      });
      await refreshMongoUser();
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  }

  async function clearNotifications() {
    if (!mongoUser || !user) return;
    try {
      const token = await user.getIdToken();
      await fetch(`/api/user/${mongoUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notification: [] }),
      });
      await refreshMongoUser();
    } catch (err) {
      console.error("Failed to clear notifications", err);
    }
  }

  return (
    <nav className="w-full border-b bg-white">
      <Dialog open={notifyOpen} onOpenChange={setNotifyOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-lg font-semibold">
            Notifications
          </DialogTitle>

          <div className="mt-4 max-h-72 overflow-y-auto space-y-3">
            {mongoUser?.notification?.length > 0 ? (
              [...mongoUser.notification]
                .reverse() 
                .map((msg, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between gap-4 p-3 rounded-md border bg-gray-50 text-sm text-gray-800"
                  >
                    <div className="flex-1">{msg}</div>
                    <div>
                      <button
                        onClick={() => deleteNotificationAt(index)}
                        className="text-sm p-2 text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500 text-sm">
                No notifications yet
              </p>
            )}
          </div>

          <DialogFooter className="flex gap-2 justify-between">
            <div>
              <Button variant="ghost" onClick={clearNotifications}>
                Clear All
              </Button>
            </div>
            <div>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between w-full">
        <Link href="/" className="flex items-center">
          <span className="font-semibold text-xl">{`<LnF>`}</span>
        </Link>

        <div className="hidden md:flex flex-1 justify-center gap-8 text-gray-700 font-medium">
          <Link href="/" className={isActive("/")}>
            Home
          </Link>
          <Link
            href="/all-lost-requests"
            className={isActive("/all-lost-requests")}
          >
            All Lost Items
          </Link>
          <Link
            href="/all-found-announcements"
            className={isActive("/all-found-announcements")}
          >
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
                  <LogIn /> Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gray-700 text-white hover:bg-black">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="relative">
                <BellIcon
                  className="cursor-pointer"
                  onClick={() => setNotifyOpen(true)}
                />

                {mongoUser?.notification?.length > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-4.5 h-4.5 text-[10px] font-bold text-white bg-red-600 rounded-full">
                    {mongoUser.notification.length}
                  </span>
                )}
              </div>

              <Link href={`/user/${mongoUserId}`}>
                <Button variant="outline">
                  <UserIcon />
                  {user?.displayName?.split(" ")[0] || "Profile"}
                </Button>
              </Link>

              <Button
                onClick={handleLogout}
                className="bg-stone-800 text-white"
              >
                <LogOut /> Logout
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
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-6 text-lg font-medium">
                <Link href="/" className={isActive("/")}>
                  Home
                </Link>
                <Link
                  href="/all-lost-requests"
                  className={isActive("/all-lost-requests")}
                >
                  All Lost Items
                </Link>
                <Link
                  href="/all-found-announcements"
                  className={isActive("/all-found-announcements")}
                >
                  All Found Items
                </Link>
                <Link
                  href="/top-performers"
                  className={isActive("/top-performers")}
                >
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
                      <Button className="bg-gray-700 text-white">
                        Register
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <BellIcon
                      className="cursor-pointer"
                      onClick={() => setNotifyOpen(true)}
                    />

                    {mongoUser?.notification?.length > 0 && (
                      <span className="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-4.5 h-4.5 text-[10px] font-bold text-white bg-red-600 rounded-full">
                        {mongoUser.notification.length}
                      </span>
                    )}

                    <Link href={`/user/${mongoUserId}`}>
                      <Button variant="outline" className="mb-2">
                        {mongoUser?.name?.split(" ")[0] || "Profile"}
                      </Button>
                    </Link>

                    <Button
                      onClick={handleLogout}
                      className="bg-stone-800 text-white"
                    >
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

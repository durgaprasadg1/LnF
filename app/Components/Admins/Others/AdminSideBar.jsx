import React from 'react'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LogOut, ShieldCheck, Users } from 'lucide-react';
function AdminSidebar({ onNavigate, onLogout }) {
  const pathname = usePathname();

  const isActive = (path) =>
    pathname === path
      ? "bg-slate-500 text-black"
      : "hover:bg-slate-600";

  return (
    <div className="h-full flex flex-col bg-slate-700 text-white">
      <div className="px-6 py-4 border-b">
        <h1 className="text-xl font-bold">&lt;LnF&gt;</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          href="/admin"
          onClick={onNavigate}
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/admin")}`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/admin/users"
          onClick={onNavigate}
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/admin/users")}`}
        >
          <Users size={18} />
          Users
        </Link>

        <Link
          href="/admin/unverified-requests"
          onClick={onNavigate}
          className={`flex items-center gap-3 px-3 py-2 rounded-md ${isActive("/admin/verification")}`}
        >
          <ShieldCheck size={18} />
          Verification
        </Link>
      </nav>

      <div className="px-4 py-4 border-t">
        <Button
          onClick={onLogout}
          className="w-full bg-slate-800 text-white hover:bg-slate-900"
        >
          <LogOut className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export default AdminSidebar
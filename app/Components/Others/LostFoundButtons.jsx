"use client";
import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const LostFoundButtons = () => {

    const { mongoUser } = useAuth();
  return (
    <div className="flex gap-4">
          <Link href={`/user/${mongoUser?._id}/new-lost-request`}>
            <Button className="bg-slate-800 hover:bg-slate-900">
              New Lost Request
            </Button>
          </Link>

          <Link href={`/user/${mongoUser?._id}/new-found-announcement`}>
            <Button className="bg-slate-800 hover:bg-slate-900">
              New Found Announcement
            </Button>
          </Link>
        </div>
  )
}

export default LostFoundButtons
import React from 'react'
import ActionCard from './ActionCard';
function QuickActions({ mongoUser }) {
  return (
    <div className="mt-10 p-6 border rounded-xl bg-white shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <ActionCard
          title="My Lost Requests"
          link={`/user/${mongoUser._id}/lost-requests`}
          label="View all"
        />
        <ActionCard
          title="My Found Announcements"
          link={`/user/${mongoUser._id}/found-announcements`}
          label="View all"
        />
        <ActionCard
          title="Report Lost Item"
          link={`/user/${mongoUser._id}/new-lost-request`}
          label="Create new request"
        />
        <ActionCard
          title="Report Found Item"
          link={`/user/${mongoUser._id}/new-found-announcement`}
          label="Create new announcement"
        />
      </div>
    </div>
  );
}

export default QuickActions
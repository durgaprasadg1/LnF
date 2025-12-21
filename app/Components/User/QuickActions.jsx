import React from 'react'
import ActionCard from './ActionCard';
function QuickActions() {
  return (
    <div className="mt-10 p-6 border rounded-xl bg-white shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <ActionCard
          title="My Lost Requests"
          link="/my/lost"
          label="View all"
        />
        <ActionCard
          title="My Found Announcements"
          link="/my/found"
          label="View all"
        />
        <ActionCard
          title="Report Lost Item"
          link="/user/sessionid/new-lost-request"
          label="Create new request"
        />
        <ActionCard
          title="Report Found Item"
          link="/user/sessionid/new-found-announcement"
          label="Create new announcement"
        />
      </div>
    </div>
  );
}

export default QuickActions
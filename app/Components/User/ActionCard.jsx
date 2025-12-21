import Link from 'next/link';
import React from 'react'

function ActionCard({ title, link, label }) {
  return (
    <Link
      href={link}
      className="border p-4 rounded-lg hover:bg-gray-50 transition shadow-sm"
    >
      <div className="font-medium">{title}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </Link>
  );
}

export default ActionCard
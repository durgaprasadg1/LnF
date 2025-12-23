import React from 'react'

function InfoCard({ title, text }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-3 text-gray-600 text-sm">{text}</p>
    </div>
  );
}

export default InfoCard
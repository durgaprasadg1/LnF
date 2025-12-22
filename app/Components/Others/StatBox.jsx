import React from 'react'

function StatBox({ label, value, color }) {
  return (
    <div className={`p-4 rounded-xl ${color} border`}>
      <p className="text-gray-700">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}

export default StatBox
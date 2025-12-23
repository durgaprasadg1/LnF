import React from 'react'


const StatCard = ({ title, value, Icon }) => (
  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-300">{title}</p>
        <p className="text-3xl font-semibold text-white mt-1">{value}</p>
      </div>
      <div className="p-3 rounded-xl bg-white/10">
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

export default StatCard
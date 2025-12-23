import React from 'react'

function Step({ icon, title, description, children }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start">
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-800">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        {children}
      </div>
    </div>
  );
}

export default Step
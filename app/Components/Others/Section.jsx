import React from 'react'


function Section({ title, content }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h2>
      <div className="text-gray-600 text-sm leading-relaxed">
        {content}
      </div>
    </div>
  );
}

export default Section
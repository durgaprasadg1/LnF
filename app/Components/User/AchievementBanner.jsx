import React from 'react'

function AchievementBanner({ count }) {
  if (count <= 0) return null;

  return (
    <div className="mt-10 p-6 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-xl">
      <h3 className="font-semibold text-lg">🏆 Community Hero!</h3>
      <p className="text-sm mt-1">
        You've helped return <b>{count}</b> items to their owners. Thank you for making our
        community better!
      </p>
    </div>
  );
}
export default AchievementBanner
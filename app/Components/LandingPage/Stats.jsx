"use client";

import SectionWrapper from "./SectionWrapper";

export default function Stats() {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-3 text-center">
        <div>
          <h2 className="text-4xl font-bold">128</h2>
          <p className="text-gray-600 mt-2">Items Retrieved</p>
        </div>
        <div>
          <h2 className="text-4xl font-bold">2.5k</h2>
          <p className="text-gray-600 mt-2">Active Users</p>
        </div>
        <div>
          <h2 className="text-4xl font-bold">Verified</h2>
          <p className="text-gray-600 mt-2">Reports</p>
        </div>
      </div>
    </SectionWrapper>
  );
}

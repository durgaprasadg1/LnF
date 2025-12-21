import React from 'react'

function InputBox({ label, value, onChange, textarea }) {
  return (
    <div className="space-y-1">
      <label className="text-sm">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          className="w-full border rounded-md p-2"
          rows={3}
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          className="w-full border rounded-md p-2"
        />
      )}
    </div>
  );
}


export default InputBox
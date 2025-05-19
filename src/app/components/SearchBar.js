import React from 'react'

function SearchBar({ value, onChange }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by make, model or years"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-[600px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default SearchBar

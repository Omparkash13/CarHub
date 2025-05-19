'use client';
import React, { useState } from 'react';

function Filter({ sortByPrice, setSortByPrice, year, setYear }) {


  const handlePriceChange = (e) => {
    setSortByPrice(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i); // Last 20 years

  return (
    <div className="w-[300px] h-auto bg-white shadow-md rounded-lg p-6 space-y-6 border-[1px]">
      <div className="flex items-center justify-between">
  <h2 className="text-xl font-semibold text-gray-800">Filter Cars</h2>
  <button
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded cursor-pointer"
    aria-label="Request more information" onClick={()=>{setSortByPrice('');setYear('')}}
  >
    Reset
  </button>
</div>


      {/* Sort by Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sort by Price</label>
        <select
          value={sortByPrice}
          onChange={handlePriceChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      {/* Filter by Year */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
        <select
          value={year}
          onChange={handleYearChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Years</option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filter;

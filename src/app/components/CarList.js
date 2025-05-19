'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import useDebounce from '../utils/hooks/useDebounce';
import Filter from './Filter';

function CarList() {
  const [carList, setCarList] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortByPrice, setSortByPrice] = useState('');
  const [year, setYear] = useState('');
  const carsPerPage = 6;

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const currentCars = filteredCars.slice(startIndex, endIndex);

  // Fetch data
  const getCarList = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://arpitjoshi.github.io/8e4474f3-d675-44c2-ba12-ccfacfa97c8b.json');
      if (response.ok) {
        const result = await response.json();
        setCarList(result);
        setFilteredCars(result);
      }
    } catch (error) {
      console.error('Failed to fetch car list:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCarList();
  }, []);

  // Debounced search
  useDebounce(() => {
    applyFilters();
  }, 500, [searchQuery, year, sortByPrice, carList]);

  const applyFilters = () => {
    let updated = [...carList];

    if (searchQuery) {
      updated = updated.filter(
        (car) =>
          car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(car.year).includes(searchQuery)
      );
    }

    if (year) {
      updated = updated.filter((car) => String(car.year) === year);
    }

    if (sortByPrice === 'lowToHigh') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortByPrice === 'highToLow') {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(updated);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  return (
    <div className="p-4 min-h-screen flex gap-20">
      {/* Sidebar Filter */}
      <div className="mt-[90px]">
        <Filter
          sortByPrice={sortByPrice}
          setSortByPrice={(val) => {
            setSortByPrice(val);
          }}
          year={year}
          setYear={(val) => {
            setYear(val);
          }}
        />
      </div>

      {/* Car Listing */}
      <div className="flex-1">
        <div className="flex justify-center">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-6">
          {currentCars.length > 0 ? (
            currentCars.map((car) => (
              <Link
                href={{ pathname: `/cars/${car.id}`}}
                key={car.id}
                className="transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="overflow-hidden h-full border border-gray-300 hover:border-primary/50 rounded-lg shadow-sm">
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={car.image?.[1] || car.image?.[0] || '/placeholder.png'}
                      alt={`${car.year} ${car.make} ${car.model}`}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                    <p className="absolute top-2 right-2 bg-white/80 text-black text-xs px-2 py-1 rounded">
                      {car.year}
                    </p>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold">
                      {car.make} {car.model}
                    </h3>

                    <p className="text-xl font-bold text-primary mt-1">${car.price.toLocaleString()}</p>

                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-700">
                      <span className="bg-gray-100 px-2 py-1 rounded">{car.mileage.toLocaleString()} mi</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{car.transmission}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{car.fuelType}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : loading ? (
            <p>Loading...</p>
          ) : (
            <p>No records found</p>
          )}
        </div>

        {/* Pagination */}
        {filteredCars.length > 0 && (
          <div className="flex justify-center mt-8">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CarList;

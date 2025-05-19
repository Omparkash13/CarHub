'use client';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function CarDetails() {
  const params = useParams()
  const router = useRouter();
  const [carDetails, setCarDetils] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCarList = async () => {
    try {
      const response = await fetch('https://arpitjoshi.github.io/8e4474f3-d675-44c2-ba12-ccfacfa97c8b.json');
      if (response.ok) {
        const result = await response.json();
        result.find((item) => {
          if (item.id == params.id) {
            setCarDetils(item)
          }
        })
      }
    } catch (error) {
      console.error('Failed to fetch car list:', error);
    }
  };

  useEffect(() => {
    getCarList()
  }, [router])


  const handleGoBack = () => {
    router.back();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? carDetails?.image.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === carDetails?.image.length - 1 ? 0 : prev + 1));
  };

  if (!carDetails) {
    return <div className="text-center py-10 text-gray-500">Loading car details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <button
            onClick={handleGoBack}
            className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Go back to listings"
          >
            ← Back
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Left: Custom Carousel */}
          <div className="rounded-lg shadow-lg bg-white overflow-hidden relative">
            {carDetails?.image?.length > 0 ? (
              <>
                <div className="relative w-full aspect-w-16 aspect-h-9 bg-gray-100">
                  <img
                    src={carDetails.image[currentIndex]}
                    alt={`${carDetails.year} ${carDetails.make} ${carDetails.model} - Image ${currentIndex + 1}`}
                    className="object-cover w-full h-full transition-transform duration-500 ease-in-out"
                    loading="lazy"
                  />
                  {/* Prev/Next Buttons */}
                  <button
                    onClick={prevSlide}
                    className="absolute top-1/2 cursor-pointer left-4 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-3 shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Previous Image"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute top-1/2 cursor-pointer right-4 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-3 shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Next Image"
                  >
                    ›
                  </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center space-x-3 mt-5">
                  {carDetails.image.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-4 h-4 rounded-full transition-colors ${idx === currentIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-blue-400'
                        }`}
                      aria-label={`Go to slide ${idx + 1}`}
                      aria-pressed={idx === currentIndex}
                    />
                  ))}
                </div>

                {/* Car Basic Info below carousel for better grouping */}
                <section className="px-6 py-6 border-t border-gray-100">
                  <h1 className="text-3xl font-extrabold text-gray-900">{carDetails.year} {carDetails.make} {carDetails.model}</h1>
                  <p className="mt-2 text-2xl text-blue-600 font-semibold">${carDetails.price}</p>
                  {carDetails.color && carDetails.mileage && (
                    <p className="mt-1 text-sm text-gray-500">{carDetails.color} • {carDetails.mileage} miles</p>
                  )}
                </section>
              </>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400 text-lg font-medium">
                No Image Available
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="space-y-10">
            <section className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {carDetails.description || "No description available."}
              </p>
            </section>

            {carDetails.features?.length > 0 && (
              <section className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {carDetails.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-700">{feature}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h2>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-gray-700 text-sm">
                {carDetails.engine && (
                  <>
                    <dt className="font-medium">Engine:</dt>
                    <dd>{carDetails.engine}</dd>
                  </>
                )}
                {carDetails.transmission && (
                  <>
                    <dt className="font-medium">Transmission:</dt>
                    <dd>{carDetails.transmission}</dd>
                  </>
                )}
                {carDetails.fuelEconomyCity && carDetails.fuelEconomyHighway && (
                  <>
                    <dt className="font-medium">Fuel Economy:</dt>
                    <dd>{`${carDetails.fuelEconomyCity} City / ${carDetails.fuelEconomyHighway} Highway`}</dd>
                  </>
                )}
                {carDetails.interiorColor && (
                  <>
                    <dt className="font-medium">Interior:</dt>
                    <dd>{carDetails.interiorColor}</dd>
                  </>
                )}
                {carDetails.horsepower && (
                  <>
                    <dt className="font-medium">Horsepower:</dt>
                    <dd>{carDetails.horsepower} hp</dd>
                  </>
                )}
              </dl>
            </section>

            <section className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Seller</h2>
              <button
                className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Request more information"
              >
                Request More Information
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CarDetails;

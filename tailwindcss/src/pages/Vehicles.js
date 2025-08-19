import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';

const Vehicles = ({ cars }) => {
  // Find the maximum price to set the slider's upper limit
  const maxPrice = cars.length > 0 ? Math.max(...cars.map(car => car.rentPerHour)) : 0;

  // State for filters and sorting
  const [brandFilter, setBrandFilter] = useState('all');
  const [gearboxFilter, setGearboxFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState(maxPrice);
  const [sortBy, setSortBy] = useState('price-asc');

  // State for the cars that will be displayed
  const [filteredCars, setFilteredCars] = useState(cars);

  // Get unique brands and gearbox types for the dropdowns
  const brands = ['all', ...new Set(cars.map(car => car.name.split(' ')[0]))];
  const gearboxTypes = ['all', ...new Set(cars.map(car => car.fuelType))];

  // Effect to apply filters and sorting when they change
  useEffect(() => {
    let tempCars = [...cars];

    // Filter by brand
    if (brandFilter !== 'all') {
      tempCars = tempCars.filter(car => car.name.startsWith(brandFilter));
    }

    // Filter by gearbox
    if (gearboxFilter !== 'all') {
      tempCars = tempCars.filter(car => car.fuelType === gearboxFilter);
    }

    // Filter by price
    tempCars = tempCars.filter(car => car.rentPerHour <= priceFilter);

    // Sort the filtered cars
    switch (sortBy) {
      case 'price-asc':
        tempCars.sort((a, b) => a.rentPerHour - b.rentPerHour);
        break;
      case 'price-desc':
        tempCars.sort((a, b) => b.rentPerHour - a.rentPerHour);
        break;
      case 'brand-asc':
        tempCars.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'brand-desc':
        tempCars.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredCars(tempCars);
  }, [brandFilter, gearboxFilter, priceFilter, sortBy, cars]);

  useEffect(() => {
    setPriceFilter(maxPrice);
  }, [maxPrice]);

  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <section className="text-center mb-12" aria-labelledby="vehicles-title">
        <h1 id="vehicles-title" className="text-5xl font-bold mb-4">Available Vehicles</h1>
        <p className="text-lg text-gray-600">Choose from our premium selection of rental cars</p>
      </section>

      {/* Filtering and Sorting Section */}
      <section className="mb-8 p-4 bg-white rounded-lg shadow-md" aria-label="Filter and sort vehicles">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Brand Filter */}
          <div>
            <label htmlFor="brand-filter" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              id="brand-filter"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand.charAt(0).toUpperCase() + brand.slice(1)}</option>
              ))}
            </select>
          </div>
          {/* Gearbox Filter */}
          <div>
            <label htmlFor="gearbox-filter" className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
            <select
              id="gearbox-filter"
              value={gearboxFilter}
              onChange={(e) => setGearboxFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              {gearboxTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
          </div>
          {/* Price Filter */}
          <div>
            <label htmlFor="price-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price: <span className="font-bold text-indigo-600">${priceFilter}</span>
            </label>
            <input
              id="price-filter"
              type="range"
              min="0"
              max={maxPrice}
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          {/* Sort By */}
          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="brand-asc">Brand: A to Z</option>
              <option value="brand-desc">Brand: Z to A</option>
            </select>
          </div>
        </div>
      </section>

      <section aria-label="Vehicle Catalog">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.length > 0 ? (
            filteredCars.map(car => (
              <CarCard key={car._id} car={car} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No cars match the current filters.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Vehicles;

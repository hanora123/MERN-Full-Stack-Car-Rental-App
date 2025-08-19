import React from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';

const Home = ({ cars }) => {
  const featuredCars = cars.slice(0, 3);

  return (
    <main className="container mx-auto px-4 py-8" role="main">
      {/* Hero Section */}
      <section className="text-center mb-16" aria-labelledby="hero-title">
        <h1 id="hero-title" className="text-5xl font-bold mb-4">Premium Car Rental Service</h1>
        <p className="text-lg text-gray-600 mb-8">Experience luxury and comfort with our premium selection of rental vehicles</p>
        <div className="flex justify-center items-baseline mb-8">
          <h2 className="text-4xl font-bold text-indigo-600">Starting from $25</h2>
          <span className="text-gray-500 ml-2">/day</span>
        </div>
        <Link to="/vehicles" className="bg-indigo-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-indigo-700">Browse Cars</Link>
      </section>

      {/* Featured Cars */}
      <section aria-labelledby="featured-cars-title">
        <div className="flex justify-between items-center mb-4">
          <h2 id="featured-cars-title" className="text-2xl font-bold">Featured Cars</h2>
          <Link to="/vehicles" className="text-indigo-600 hover:underline">View All ➔</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredCars.map(car => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;

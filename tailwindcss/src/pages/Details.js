import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SpecCard from '../components/SpecCard';
import CarCard from '../components/CarCard';

const Details = ({ openModal, cars }) => {
  const { id } = useParams();
  const car = cars.find(c => c._id === id);

  // If car is not found, display a message
  if (!car) {
    return (
      <main id="main" className="container mx-auto px-4 py-8 text-center" role="main">
        <h1 className="text-4xl font-bold mb-4">Car Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the car you're looking for.
        </p>
        <Link to="/vehicles" className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700">
          Back to All Vehicles
        </Link>
      </main>
    );
  }

  const otherCars = cars.filter(c => c._id !== car._id).slice(0, 3);

  return (
    <main id="main" className="container mx-auto px-4 py-8" role="main">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column (visuals) */}
        <section aria-labelledby="car-title">
          <h1 id="car-title" className="text-4xl font-bold mb-2">{car.name}</h1>
          <div className="flex items-baseline mb-4">
            <h2 className="text-3xl font-bold text-indigo-600">${car.rentPerHour}</h2>
            <span className="text-gray-500 ml-2">/day</span>
          </div>

          <div className="mb-4">
            <img src={car.image} alt={`${car.name} sedan front three-quarter view`} className="w-full rounded-lg shadow-md" />
          </div>

          {car.images && (
            <div className="grid grid-cols-3 gap-4" aria-label="Gallery">
              {car.images.map((image, index) => (
                <img key={index} src={image} alt={`${car.name} view ${index + 1}`} className="w-full rounded-lg shadow-md" />
              ))}
            </div>
          )}
        </section>

        {/* Right column (specs) */}
        <section aria-labelledby="specs-title">
          <h2 id="specs-title" className="text-2xl font-bold mb-4">Technical Specification</h2>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <SpecCard spec={{ name: 'Capacity', value: car.capacity, icon: 'fa-solid fa-chair' }} />
            <SpecCard spec={{ name: 'Fuel Type', value: car.fuelType, icon: 'fa-solid fa-gas-pump' }} />
          </div>

          <button onClick={() => openModal(car._id)} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 mb-8 btn-hover" aria-label="Rent this car">Rent a car</button>

        </section>
      </div>

      {/* Other Cars */}
      <section className="mt-16" aria-labelledby="other-cars-title">
        <div className="flex justify-between items-center mb-4">
          <h3 id="other-cars-title" className="text-2xl font-bold">Other cars</h3>
          <button className="text-indigo-600 hover:underline">View All ➔</button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {otherCars.map(car => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Details;

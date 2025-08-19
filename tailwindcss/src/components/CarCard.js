import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  const [brand, model] = car.name.split(' ');
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
      <img src={car.image} alt={`${brand} ${model}`} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-xl font-bold">{brand}</h4>
            <h5 className="text-gray-600">{model}</h5>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-indigo-600">${car.rentPerHour}</span>
            <small className="text-gray-500">/day</small>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          <small className="flex items-center gap-2 text-gray-700"><i className="fa-solid fa-cog"></i>{car.fuelType}</small>
          <small className="flex items-center gap-2 text-gray-700"><i className="fa-solid fa-gas-pump"></i>{car.fuelType}</small>
          <small className="flex items-center gap-2 text-gray-700"><i className="fa-solid fa-snowflake"></i>Air Conditioner</small>
        </div>
        <Link to={`/details/${car._id}`} className="mt-4 inline-block w-full text-center bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700">
          View Details
        </Link>
      </div>
    </article>
  );
};

export default CarCard;

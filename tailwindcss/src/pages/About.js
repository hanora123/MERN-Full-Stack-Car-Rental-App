import React from 'react';

const About = () => {
  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <section aria-labelledby="about-title">
        <h1 id="about-title" className="text-4xl font-bold text-center mb-4">About Car Rental</h1>
        <p className="text-lg text-gray-600 text-center mb-8">We are a premium car rental service dedicated to providing exceptional vehicles and outstanding customer service.</p>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-8">To provide reliable, high-quality vehicles for all your transportation needs with exceptional customer service and competitive pricing.</p>
          
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Why Choose Us</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li className="mb-2">Premium vehicle selection</li>
            <li className="mb-2">Competitive pricing</li>
            <li className="mb-2">24/7 customer support</li>
            <li className="mb-2">Flexible rental terms</li>
            <li className="mb-2">Well-maintained vehicles</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default About;

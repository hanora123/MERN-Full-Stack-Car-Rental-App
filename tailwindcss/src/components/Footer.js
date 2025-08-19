import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="footer-section">
            <div className="flex items-center gap-4 mb-4">
              <i className="fa-solid fa-car text-3xl"></i>
              <div className="text-2xl font-bold">Car Rental</div>
            </div>
            <p className="text-gray-400">Premium rentals with great support and easy booking.</p>
            <div className="flex gap-4 mt-4">
              <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                <i className="fa-brands fa-apple"></i>
                <div>
                  <span className="block text-xs">Download on the</span>
                  <span className="block font-bold">App Store</span>
                </div>
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                <i className="fa-brands fa-google-play"></i>
                <div>
                  <span className="block text-xs">GET IT ON</span>
                  <span className="block font-bold">Google Play</span>
                </div>
              </button>
            </div>
            <div className="flex gap-4 mt-4">
              <button aria-label="Facebook" className="bg-gray-800 hover:bg-gray-700 text-white h-10 w-10 rounded-full"><i className="fa-brands fa-facebook"></i></button>
              <button aria-label="Instagram" className="bg-gray-800 hover:bg-gray-700 text-white h-10 w-10 rounded-full"><i className="fa-brands fa-instagram"></i></button>
              <button aria-label="Twitter" className="bg-gray-800 hover:bg-gray-700 text-white h-10 w-10 rounded-full"><i className="fa-brands fa-x-twitter"></i></button>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2"><Link to="/" className="hover:text-indigo-400">Home</Link></li>
              <li className="mb-2"><Link to="/vehicles" className="hover:text-indigo-400">Vehicles</Link></li>
              <li className="mb-2"><Link to="/details" className="hover:text-indigo-400">Details</Link></li>
              <li className="mb-2"><Link to="/about" className="hover:text-indigo-400">About Us</Link></li>
              <li className="mb-2"><Link to="/contact" className="hover:text-indigo-400">Contact Us</Link></li>
              <li className="mb-2"><Link to="/admin" className="hover:text-indigo-400">Admin</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="text-xl font-bold mb-4">Support</h4>
            <ul>
              <li className="mb-2"><button className="hover:text-indigo-400">FAQ</button></li>
              <li className="mb-2"><button className="hover:text-indigo-400">Terms</button></li>
              <li className="mb-2"><button className="hover:text-indigo-400">Privacy</button></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-500">
          © 2025 Car Rental. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

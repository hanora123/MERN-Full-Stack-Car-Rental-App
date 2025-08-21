import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Modal from './Modal';
import RentCarForm from './RentCarForm';

const Header = ({ openModal, isModalOpen, closeModal, cars, selectedCar, user, setUser }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'text-indigo-600 bg-indigo-100' : 'text-gray-700 hover:bg-gray-100';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    closeMenu();
  };

  return (
    <header className="bg-white shadow-md" role="banner">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <i className="fa-solid fa-car text-3xl text-indigo-600"></i>
          <div className="text-2xl font-bold">Car Rental</div>
        </div>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        {/* Desktop Menu */}
        <nav className="hidden md:flex md:items-center md:gap-4" aria-label="Primary">
          <Link to="/" className={`px-4 py-2 rounded-lg ${isActive('/')} link-hover`}>Home</Link>
          <Link to="/vehicles" className={`px-4 py-2 rounded-lg ${isActive('/vehicles')} link-hover`}>Vehicles</Link>
          <Link to="/details" className={`px-4 py-2 rounded-lg ${isActive('/details')} link-hover`}>Details</Link>
          <Link to="/about" className={`px-4 py-2 rounded-lg ${isActive('/about')} link-hover`}>About Us</Link>
          <Link to="/contact" className={`px-4 py-2 rounded-lg ${isActive('/contact')} link-hover`}>Contact Us</Link>
          {user && user.role === 'admin' && (
            <Link to="/admin" className={`px-4 py-2 rounded-lg ${isActive('/admin')} link-hover`}>Admin</Link>
          )}
          {user ? (
            <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 link-hover">Logout</button>
          ) : (
            <Link to="/login" className={`px-4 py-2 rounded-lg ${isActive('/login')} link-hover`}>Sign In</Link>
          )}
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center md:hidden">
            <button onClick={closeMenu} className="absolute top-4 right-4 text-gray-700 text-3xl" aria-label="Close menu">
              &times;
            </button>
            <nav className="flex flex-col items-center gap-6 text-2xl">
              <Link to="/" className={`px-4 py-2 rounded-lg ${isActive('/')}`} onClick={closeMenu}>Home</Link>
              <Link to="/vehicles" className={`px-4 py-2 rounded-lg ${isActive('/vehicles')}`} onClick={closeMenu}>Vehicles</Link>
              <Link to="/details" className={`px-4 py-2 rounded-lg ${isActive('/details')}`} onClick={closeMenu}>Details</Link>
              <Link to="/about" className={`px-4 py-2 rounded-lg ${isActive('/about')}`} onClick={closeMenu}>About Us</Link>
              <Link to="/contact" className={`px-4 py-2 rounded-lg ${isActive('/contact')}`} onClick={closeMenu}>Contact Us</Link>
              {user && user.role === 'admin' && (
                <Link to="/admin" className={`px-4 py-2 rounded-lg ${isActive('/admin')}`} onClick={closeMenu}>Admin</Link>
              )}
              {user ? (
                <button onClick={handleLogout} className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Logout</button>
              ) : (
                <Link to="/login" className={`px-4 py-2 rounded-lg ${isActive('/login')}`} onClick={closeMenu}>Sign In</Link>
              )}
              <button onClick={() => { closeMenu(); openModal(); }} className="bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 btn-hover">Book Now</button>
            </nav>
          </div>
        )}

        {/* Desktop Contact Info */}
        <div className="hidden md:flex items-center gap-4">
          {user && <span className="font-semibold">Welcome, {user.username}</span>}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              <i className="fa-solid fa-phone"></i>
            </div>
            <a className="font-semibold" href="tel:+123456789">+123 456 6789</a>
          </div>
          <button onClick={() => openModal()} className="bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 btn-hover">Book Now</button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Rent a Car">
        <RentCarForm cars={cars} selectedCar={selectedCar} user={user} closeModal={closeModal} />
      </Modal>
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import Details from './pages/Details';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Chatbot from './components/Chatbot';
import './index.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars/getallcars');
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const openModal = (carId = null) => {
    setSelectedCar(carId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Header openModal={openModal} isModalOpen={isModalOpen} closeModal={closeModal} cars={cars} selectedCar={selectedCar} user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home cars={cars} />} />
          <Route path="/vehicles" element={<Vehicles cars={cars} />} />
          <Route path="/details" element={<Details openModal={openModal} cars={cars} />} />
          <Route path="/details/:id" element={<Details openModal={openModal} cars={cars} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;

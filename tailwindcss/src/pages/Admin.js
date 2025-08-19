import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal'; // Assuming you have a Modal component

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [formState, setFormState] = useState({});

  const fetchData = async () => {
    try {
      const [carsRes, usersRes, bookingsRes] = await Promise.all([
        axios.get('/api/cars/getallcars'),
        axios.get('/api/users/getallusers'),
        axios.get('/api/bookings/getallbookings'),
      ]);
      setCars(carsRes.data);
      setUsers(usersRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (type, id) => {
    const endpointMap = {
        cars: 'car',
        users: 'user',
        bookings: 'booking'
    };
    try {
      await axios.delete(`/api/${type}/delete${endpointMap[type]}`, { data: { [`${endpointMap[type]}id`]: id } });
      alert(`${type.slice(0, -1)} deleted successfully`);
      fetchData(); // Refresh data
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const handleEdit = (type, item) => {
    setEditingItem({ type, ...item });
    setFormState(item);
    setIsModalOpen(true);
  };

  const handleCreate = (type) => {
    setEditingItem({ type });
    setFormState({});
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { type, _id } = editingItem;
    const endpoint = _id ? `/api/${type}/edit${type.slice(0,-1)}` : `/api/${type}/add${type.slice(0,-1)}`;
    const method = _id ? 'put' : 'post';

    try {
        await axios[method](endpoint, _id ? { ...formState, _id } : formState);
        alert(`${type.slice(0, -1)} ${ _id ? 'updated' : 'created'} successfully`);
        fetchData();
        setIsModalOpen(false);
        setEditingItem(null);
    } catch (error) {
        console.error(`Error saving ${type}:`, error);
    }
  };

  const renderForm = () => {
    if (!editingItem) return null;
    const { type } = editingItem;
    if (type === 'cars') {
        return (
            <form onSubmit={handleFormSubmit}>
                <input name="name" value={formState.name || ''} onChange={handleFormChange} placeholder="Name" required className="w-full p-2 mb-2 border rounded"/>
                <input name="image" value={formState.image || ''} onChange={handleFormChange} placeholder="Image URL" className="w-full p-2 mb-2 border rounded"/>
                <input name="capacity" type="number" value={formState.capacity || ''} onChange={handleFormChange} placeholder="Capacity" required className="w-full p-2 mb-2 border rounded"/>
                <input name="fuelType" value={formState.fuelType || ''} onChange={handleFormChange} placeholder="Fuel Type" required className="w-full p-2 mb-2 border rounded"/>
                <input name="rentPerHour" type="number" value={formState.rentPerHour || ''} onChange={handleFormChange} placeholder="Rent Per Hour" required className="w-full p-2 mb-2 border rounded"/>
                <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Save</button>
            </form>
        );
    }
    if (type === 'users') {
        return (
            <form onSubmit={handleFormSubmit}>
                <input name="username" value={formState.username || ''} onChange={handleFormChange} placeholder="Username" required className="w-full p-2 mb-2 border rounded"/>
                {!editingItem._id && <input name="password" type="password" value={formState.password || ''} onChange={handleFormChange} placeholder="Password" required className="w-full p-2 mb-2 border rounded"/>}
                <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Save</button>
            </form>
        );
    }
    return null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

      {/* Cars Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Cars</h2>
            <button onClick={() => handleCreate('cars')} className="bg-green-500 text-white py-2 px-4 rounded">Add Car</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map(car => (
            <div key={car._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold">{car.name}</h3>
              <p>Capacity: {car.capacity}</p>
              <p>Rent per hour: ${car.rentPerHour}</p>
              <button onClick={() => handleEdit('cars', car)} className="text-blue-500 mr-2">Edit</button>
              <button onClick={() => handleDelete('cars', car._id)} className="text-red-500">Delete</button>
            </div>
          ))}
        </div>
      </section>

      {/* Users Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Users</h2>
            <button onClick={() => handleCreate('users')} className="bg-green-500 text-white py-2 px-4 rounded">Add User</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <div key={user._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold">{user.username}</h3>
              <button onClick={() => handleEdit('users', user)} className="text-blue-500 mr-2">Edit</button>
              <button onClick={() => handleDelete('users', user._id)} className="text-red-500">Delete</button>
            </div>
          ))}
        </div>
      </section>

      {/* Bookings Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Bookings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold">Booking ID: {booking._id}</h3>
              <p>User: {booking.user?.username || 'N/A'}</p>
              <p>Car: {booking.car?.name || 'N/A'}</p>
              <button onClick={() => handleDelete('bookings', booking._id)} className="text-red-500">Delete</button>
            </div>
          ))}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${editingItem?._id ? 'Edit' : 'Create'} ${editingItem?.type.slice(0, -1)}`}>
        {renderForm()}
      </Modal>
    </main>
  );
};

export default AdminDashboard;
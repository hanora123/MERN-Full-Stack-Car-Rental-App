import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formState, setFormState] = useState({
    bookedTimeSlots: { from: '', to: '' }
  });

  // Effect to calculate total days and amount automatically
  useEffect(() => {
    if (editingItem?.type === 'bookings' && formState.car && formState.bookedTimeSlots?.from && formState.bookedTimeSlots?.to) {
      const fromDate = new Date(formState.bookedTimeSlots.from);
      const toDate = new Date(formState.bookedTimeSlots.to);
      const totalDays = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;

      if (totalDays > 0) {
        const selectedCar = cars.find(c => c._id === formState.car);
        if (selectedCar) {
          const totalAmount = totalDays * selectedCar.rentPerHour;
          setFormState(prevState => ({ ...prevState, totalDays, totalAmount }));
        }
      } else {
        setFormState(prevState => ({ ...prevState, totalDays: 0, totalAmount: 0 }));
      }
    }
  }, [formState.car, formState.bookedTimeSlots, editingItem, cars]);

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
      fetchData();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const handleEdit = (type, item) => {
    setEditingItem({ type, ...item });
    // Ensure bookedTimeSlots are in YYYY-MM-DD format for the date input
    const formattedItem = {
      ...item,
      bookedTimeSlots: {
        from: item.bookedTimeSlots?.from ? new Date(item.bookedTimeSlots.from).toISOString().split('T')[0] : '',
        to: item.bookedTimeSlots?.to ? new Date(item.bookedTimeSlots.to).toISOString().split('T')[0] : '',
      }
    };
    setFormState(formattedItem);
    setIsModalOpen(true);
  };

  const handleCreate = (type) => {
    setEditingItem({ type });
    setFormState({ bookedTimeSlots: { from: '', to: '' } });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [outer, inner] = name.split('.');
      setFormState(prevState => ({
        ...prevState,
        [outer]: { ...prevState[outer], [inner]: value }
      }));
    } else {
      setFormState(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { type, _id } = editingItem;
    
    let endpoint;
    let payload = { ...formState };
    if (type === 'bookings') {
      endpoint = _id ? `/api/bookings/editbooking` : `/api/bookings/bookcar`;
      if (!_id) {
        // Ensure transactionId is generated for new bookings if not present
        payload.transactionId = payload.transactionId || `TID${Date.now()}`;
      }
    } else {
      const modelName = type.slice(0, -1);
      endpoint = _id ? `/api/${type}/edit${modelName}` : `/api/${type}/add${modelName}`;
    }
    
    const method = _id ? 'put' : 'post';

    try {
        await axios[method](endpoint, _id ? { ...payload, _id } : payload);
        alert(`${type.slice(0, -1)} ${_id ? 'updated' : 'created'} successfully`);
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
                <select name="role" value={formState.role || 'user'} onChange={handleFormChange} className="w-full p-2 mb-2 border rounded">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Save</button>
            </form>
        );
    }
    if (type === 'bookings') {
      return (
          <form onSubmit={handleFormSubmit}>
              <select name="car" value={formState.car || ''} onChange={handleFormChange} required className="w-full p-2 mb-2 border rounded">
                  <option value="">Select Car</option>
                  {cars.map(car => <option key={car._id} value={car._id}>{car.name}</option>)}
              </select>
              <select name="user" value={formState.user || ''} onChange={handleFormChange} required className="w-full p-2 mb-2 border rounded">
                  <option value="">Select User</option>
                  {users.map(user => <option key={user._id} value={user._id}>{user.username}</option>)}
              </select>
              <label className="block text-sm font-medium text-gray-700">From Date</label>
              <input type="date" name="bookedTimeSlots.from" value={formState.bookedTimeSlots?.from || ''} onChange={handleFormChange} required className="w-full p-2 mb-2 border rounded"/>
              <label className="block text-sm font-medium text-gray-700">To Date</label>
              <input type="date" name="bookedTimeSlots.to" value={formState.bookedTimeSlots?.to || ''} onChange={handleFormChange} required className="w-full p-2 mb-2 border rounded"/>
              <div className="bg-gray-100 p-2 rounded mb-2">
                <p>Total Days: {formState.totalDays || 0}</p>
                <p>Total Amount: ${formState.totalAmount || 0}</p>
              </div>
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
              <p className="text-sm text-gray-600">Role: {user.role}</p>
              <button onClick={() => handleEdit('users', user)} className="text-blue-500 mr-2">Edit</button>
              <button onClick={() => handleDelete('users', user._id)} className="text-red-500">Delete</button>
            </div>
          ))}
        </div>
      </section>

      {/* Bookings Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Bookings</h2>
            <button onClick={() => handleCreate('bookings')} className="bg-green-500 text-white py-2 px-4 rounded">Add Booking</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold">Booking ID: {booking._transactionId || booking._id}</h3>
              <p>User: {booking.user?.username || 'N/A'}</p>
              <p>Car: {booking.car?.name || 'N/A'}</p>
              <p>From: {new Date(booking.bookedTimeSlots.from).toLocaleDateString()}</p>
              <p>To: {new Date(booking.bookedTimeSlots.to).toLocaleDateString()}</p>
              <p>Total Days: {booking.totalDays}</p>
              <p>Total Amount: ${booking.totalAmount}</p>
              <button onClick={() => handleEdit('bookings', booking)} className="text-blue-500 mr-2">Edit</button>
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
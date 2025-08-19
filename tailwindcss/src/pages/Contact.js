import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="container mx-auto px-4 py-8" role="main">
      <section aria-labelledby="contact-title">
        <h1 id="contact-title" className="text-4xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 text-center mb-8">Get in touch with us for any inquiries or support</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Contact Information</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-location-dot text-2xl text-indigo-600"></i>
              </div>
              <div>
                <strong className="font-semibold">Address</strong>
                <p className="text-gray-600">123 Main St, City</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-envelope text-2xl text-indigo-600"></i>
              </div>
              <div>
                <strong className="font-semibold">Email</strong>
                <p><a href="mailto:info@example.com" className="text-gray-600 hover:text-indigo-600">info@example.com</a></p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-phone text-2xl text-indigo-600"></i>
              </div>
              <div>
                <strong className="font-semibold">Phone</strong>
                <p><a href="tel:+123456789" className="text-gray-600 hover:text-indigo-600">+123 456 6789</a></p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-semibold mb-2">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold mb-2">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-semibold mb-2">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 h-32"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;

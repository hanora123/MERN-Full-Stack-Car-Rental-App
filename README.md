# React Car Rental App

This is a full-stack car rental application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. It provides a user-friendly interface for browsing, selecting, and booking rental cars, along with a comprehensive admin dashboard for managing the application's data.

## Features

- **Browse & Filter Vehicles:** Users can view a comprehensive catalog of available cars.
- **Detailed Car Views:** Each car has a dedicated details page showing technical specifications, images, and rental price.
- **User Authentication:** A complete user registration and login system.
- **Booking System:** Users can select a car and book it. The system calculates the total price and records the booking.
- **Admin Dashboard:** A comprehensive dashboard for administrators to manage the application's data.
  - **Car Management:** Full CRUD (Create, Read, Update, Delete) functionality for cars.
  - **User Management:** Full CRUD functionality for users.
  - **Booking Management:** View and cancel customer bookings.
- **Responsive Design:** The UI is fully responsive and works seamlessly on desktop, tablet, and mobile devices.

## Tech Stack

### Backend

- **Node.js:** JavaScript runtime environment.
- **Express:** Web framework for Node.js, used to build the RESTful API.
- **MongoDB:** NoSQL database for storing car, user, and booking information.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
- **`dotenv`:** For managing environment variables.
- **`cors`:** To enable Cross-Origin Resource Sharing.

### Frontend

- **React:** JavaScript library for building user interfaces.
- **React Router:** For declarative routing within the application.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Axios:** A promise-based HTTP client for making API requests to the backend.

## Project Structure

The project is organized into two main directories:

```
/
├── Backend/        # Contains the Node.js/Express backend server
│   ├── config/     # Database connection configuration
│   ├── models/     # Mongoose schemas for Cars, Users, and Bookings
│   ├── routes/     # API route definitions
│   └── server.js   # The main entry point for the backend server
│
└── tailwindcss/    # Contains the React frontend application
    ├── public/     # Public assets
    └── src/
        ├── admin/      # Admin dashboard components (Dashboard, CarList, etc.)
        ├── components/ # Reusable React components (CarCard, Header, etc.)
        ├── data/       # (Legacy) Static data, now replaced by backend calls
        ├── pages/      # Page-level components (Home, Vehicles, Login, etc.)
        └── App.js      # Main application component with routing
```

## Setup and Installation

To get this project up and running on your local machine, follow these steps.

### Prerequisites

- **Node.js** (v14 or later)
- **npm** (comes with Node.js)
- **MongoDB:** Make sure you have a running instance of MongoDB. You can use a local installation or a cloud service like MongoDB Atlas.

### 1. Backend Setup

1.  **Navigate to the Backend Directory:**
    ```bash
    cd Backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Create Environment File:**
    Create a `.env` file in the `Backend` directory and add your MongoDB connection string and a port number.
    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

4.  **Start the Backend Server:**
    ```bash
    npm start
    ```
    The server will start on the port you specified (e.g., `http://localhost:5000`).

### 2. Frontend Setup

1.  **Navigate to the Frontend Directory:**
    ```bash
    cd tailwindcss
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Frontend Development Server:**
    ```bash
    npm start
    ```
    The React application will open in your browser, usually at `http://localhost:3000`.

## API Endpoints

The backend provides the following RESTful API endpoints:

### Public & User Routes
-   `GET /api/cars/getallcars`: Fetches a list of all cars.
-   `GET /api/cars/:carId`: Fetches details for a single car by its ID.
-   `POST /api/users/login`: Authenticates a user.
-   `POST /api/users/register`: Registers a new user.
-   `POST /api/bookings/bookcar`: Creates a new car booking.

### Admin Routes
-   `GET /api/users/getallusers`: Fetches a list of all users.
-   `POST /api/cars/addcar`: Adds a new car.
-   `PUT /api/cars/editcar`: Updates an existing car's details.
-   `POST /api/cars/deletecar`: Deletes a car (expects `carid` in the body).
-   `POST /api/users/adduser`: Adds a new user.
-   `PUT /api/users/edituser`: Updates an existing user's details.
-   `POST /api/users/deleteuser`: Deletes a user (expects `userid` in the body).
-   `GET /api/bookings/getallbookings`: Fetches all bookings.
-   `POST /api/bookings/deletebooking`: Deletes a booking (expects `bookingid` in the body).

## Future Improvements

-   **User Profiles:** Allow users to view their booking history.
-   **Real-time Availability:** Implement checks to prevent double-booking of cars for the same date range.
-   **Payment Integration:** Integrate a payment gateway like Stripe or PayPal.
-   **JWT Authentication:** Replace the current basic authentication with JSON Web Tokens for better security.

# React Car Rental App

This is a full-stack car rental application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. It provides a user-friendly interface for browsing, selecting, and booking rental cars, along with a comprehensive admin dashboard for managing the application's data.

## Features

- **Browse & Filter Vehicles:** Users can view a comprehensive catalog of available cars.
- **Detailed Car Views:** Each car has a dedicated details page showing technical specifications, images, and rental price.
- **User Authentication:** A complete user registration and login system.
- **Booking System:** Users can select a car and book it for a specific date range.
- **Admin Dashboard:** A comprehensive dashboard for administrators to manage the application's data.
  - **Car Management:** Full CRUD (Create, Read, Update, Delete) functionality for cars.
  - **User Management:** Full CRUD functionality for users, including the ability to assign **Admin** or **User** roles.
  - **Booking Management:** Full CRUD functionality for bookings, allowing admins to create, view, update, and delete reservations on behalf of users.
- **Responsive Design:** The UI is fully responsive and works seamlessly on desktop, tablet, and mobile devices.

## Tech Stack

### Backend

- **Node.js:** JavaScript runtime environment.
- **Express:** Web framework for Node.js, used to build the RESTful API.
- **MongoDB:** NoSQL database for storing car, user, and booking information.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.

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
        ├── components/ # Reusable React components (CarCard, Header, Modal, etc.)
        ├── pages/      # Page-level components (Home, Vehicles, Login, Admin, etc.)
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

3.  **Configure Environment:**
    The backend connects to a MongoDB database. The connection string is hardcoded in `config/db.js`. Please update it with your own MongoDB URI.

4.  **Start the Backend Server:**
    ```bash
    node server.js
    ```
    The server will start on port 5000 (`http://localhost:5000`).

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

### Cars
-   `GET /api/cars/getallcars`: Fetches a list of all cars.
-   `POST /api/cars/addcar`: (Admin) Adds a new car.
-   `PUT /api/cars/editcar`: (Admin) Updates an existing car.
-   `DELETE /api/cars/deletecar`: (Admin) Deletes a car.

### Users
-   `POST /api/users/login`: Authenticates a user.
-   `POST /api/users/register`: Registers a new user.
-   `GET /api/users/getallusers`: (Admin) Fetches a list of all users.
-   `POST /api/users/adduser`: (Admin) Adds a new user.
-   `PUT /api/users/edituser`: (Admin) Updates an existing user (including their role).
-   `DELETE /api/users/deleteuser`: (Admin) Deletes a user.

### Bookings
-   `POST /api/bookings/bookcar`: Creates a new car booking.
-   `GET /api/bookings/getallbookings`: (Admin) Fetches all bookings.
-   `PUT /api/bookings/editbooking`: (Admin) Updates an existing booking.
-   `DELETE /api/bookings/deletebooking`: (Admin) Deletes a booking.
# React Car Rental UI

A responsive and interactive user interface for a car rental service, built with React and styled with Tailwind CSS. Users can browse vehicles, view detailed information, and book a rental through a modal form.

## Features

- **Browse Vehicles**: View a list of available cars.
- **Detailed View**: See detailed specifications, multiple images, and equipment lists for each car.
- **Responsive Design**: The application is fully responsive and works on all screen sizes.
- **Interactive Modal**: A "Book Now" modal allows users to select a car, pick-up and return dates.
- **Dynamic Price Calculation**: The rental price is calculated in real-time based on the daily rate and the selected rental duration.
- **Centralized State Management**: Modal visibility and selected car data are managed in the root `App` component.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/hanora123/React-Reental-Car-App
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd tailwindcss
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```

---

## Available Scripts

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

---

## Project Structure

```
/
├── public/           # Static assets and index.html
├── src/              # React source code
│   ├── components/   # Reusable UI components
│   │   ├── Header.js     # Site header with navigation and "Book Now" button
│   │   ├── Footer.js     # Site footer
│   │   ├── CarCard.js    # Displays a single car in a list
│   │   ├── Modal.js      # Generic modal component
│   │   └── RentCarForm.js # Form for renting a car with price calculation
│   ├── data/         # Static data (cars.js)
│   ├── pages/        # Page components
│   │   ├── Home.js
│   │   ├── Vehicles.js
│   │   └── Details.js    # Shows detailed info for a specific car
│   ├── App.js        # Main component with routing and state management
│   └── index.css     # Global styles and Tailwind CSS setup
├── package.json      # Dependencies and scripts
└── tailwind.config.js # Tailwind CSS configuration
```

---

## Core Concepts

### State Management

The application's modal state is managed in the `App.js` component to allow different components to open and close the rental modal.

- **`isModalOpen`**: A boolean state that controls the visibility of the rental modal.
- **`selectedCar`**: Stores the ID of the car selected by the user, which is then passed to the `RentCarForm`.
- **`openModal(carId)`**: A function passed as a prop to `Header.js` and `Details.js` to open the modal. It can optionally take a `carId` to pre-select a car in the form.
- **`closeModal()`**: A function passed to the `Header` and `Modal` components to close the modal.

### Data Flow for Car Rentals

1.  **Opening the Modal**:
    - From the **Header**: The "Book Now" button calls `openModal()` without an ID, opening the modal with no car pre-selected.
    - From the **Details Page**: The "Rent a car" button calls `openModal(car.id)`, passing the ID of the car being viewed.
2.  **Populating the Form**:
    - The `RentCarForm` component receives the list of all `cars` and the `selectedCar` ID as props.
    - A `useEffect` hook in `RentCarForm` listens for changes to the `selectedCar` prop and updates its internal state, ensuring the correct car is selected in the dropdown.
3.  **Calculating the Price**:
    - The `RentCarForm` component contains state for the pickup date, return date, and the selected car.
    - Another `useEffect` hook recalculates the `totalPrice` whenever these values change. The price is calculated as `(number of days) * (daily rate)`.

### Styling with Tailwind CSS

- The project uses **Tailwind CSS** for utility-first styling.
- Custom styles and hover effects are defined in `src/index.css`.
- The `tailwind.config.js` file is used for any customizations to the default theme.
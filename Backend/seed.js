const mongoose = require("mongoose");
const Car = require("./models/carModel");
const { cars } = require("../tailwindcss/src/data/cars");
const connectDB = require("./config/db");
require("dotenv").config();

const importData = async () => {
  try {
    await connectDB();

    await Car.deleteMany();

    const formattedCars = cars.map(car => ({
      name: `${car.brand} ${car.model}`,
      image: car.image,
      capacity: car.specs.find(spec => spec.name === "Seats").value,
      fuelType: car.fuel,
      bookedTimeSlots: [],
      rentPerHour: car.price,
    }));

    await Car.insertMany(formattedCars);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();

const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");

router.post("/bookcar", async (req, res) => {
  try {
    const newbooking = new Booking(req.body);
    await newbooking.save();
    const car = await Car.findOne({ _id: req.body.car });
    car.bookedTimeSlots.push(req.body.bookedTimeSlots);
    await car.save();
    res.send("Your booking is successful");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car').populate('user');
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.delete("/deletebooking", async (req, res) => {
  try {
    await Booking.findOneAndDelete({ _id: req.body.bookingid });
    res.send("Booking deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;

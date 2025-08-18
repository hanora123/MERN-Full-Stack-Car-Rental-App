const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get("/:carId", async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    res.send(car);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;

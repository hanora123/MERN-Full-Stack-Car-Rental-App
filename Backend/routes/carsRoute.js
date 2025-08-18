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

router.post("/addcar", async (req, res) => {
  try {
    const newcar = new Car(req.body);
    await newcar.save();
    res.send(newcar);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.put("/editcar", async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
    res.send(car);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.delete("/deletecar", async (req, res) => {
  try {
    await Car.findOneAndDelete({ _id: req.body.carid });

    res.send("Car deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;

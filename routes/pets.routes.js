const router = require("express").Router();
const Pet = require("../models/Pet");

router.post("/", async (req, res) => {
  try {
    const { name, age, breed } = req.body;
    const createdPet = await Pet.create({ name, age, breed });
    res.status(201).json(createdPet);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const allPets = await Pet.find();
    res.json(allPets);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

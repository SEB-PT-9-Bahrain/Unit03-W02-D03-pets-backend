const router = require("express").Router();
const Pet = require("../models/Pet");

router.post("/", async (req, res) => {
  try {
    const { name, age, breed } = req.body;
    const createdPet = await Pet.create({ name, age, breed });
    res.status(201).json(createdPet);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message,
      });
    }
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

router.get("/:petId", async (req, res) => {
  try {
    const foundPet = await Pet.findById(req.params.petId);
    if (!foundPet) {
      return res.status(404).json({
        message: "Pet Not Found",
      });
    }
    res.json(foundPet);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:petId", async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {
      new: true,
    });
    if (!updatedPet) {
      return res.status(404).json({
        message: "Pet Not Found",
      });
    }
    res.json(updatedPet);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:petId", async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.petId);
    res.json(deletedPet);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

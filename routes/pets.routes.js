const router = require("express").Router();
const Pet = require("../models/Pet");
const mongoose = require('mongoose')

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

function checkValidObjectId(req,res,next){
    if(!mongoose.Types.ObjectId.isValid(req.params.petId)){
        return res.status(400).json({
        message: "Id not valid",
      })
    }else{
        next()
    }
}

router.get("/:petId",checkValidObjectId, async (req, res) => {
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

router.put("/:petId",checkValidObjectId, async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {
      new: true,
      runValidators:true
    });
   
    res.json(updatedPet);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message,
      });
    }
    console.log(err);
  }
});

router.delete("/:petId",checkValidObjectId, async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.petId);
    res.json(deletedPet);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

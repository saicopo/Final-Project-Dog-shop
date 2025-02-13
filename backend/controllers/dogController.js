import Dog from "../models/dogsSchema.js";
import Seller from "../models/sellerSchema.js";
import mongoose from "mongoose";


export const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find().populate({
      path: "owner",
      select: "sellers",
      model: Seller,
    });
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getDogsById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID non valido" });
    }
    // 1. Usa findById con l'id corretto:
    const dog = await Dog.findById(id).populate({
      path: "owner",
      select: "sellers",
      model: Seller,
    });

    if (!dog) {
      return res.status(404).json({ message: "Cane non trovato" });
    }

    if (!dog.owner) {
      return res
        .status(404)
        .json({ message: "Venditore non trovato per questo cane" });
    }

    res.status(200).json(dog);
  } catch (error) {
    console.error("Errore durante la ricerca del cane per ID:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createDog = async (req, res) => {
  try {
    const dog = await Dog.create(req.body);
    res.status(200).json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDog = async (req, res) => {
  try {
    const dog = await Dog.findByIdAndDelete(req.params.id);
    res.status(200).json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDog = async (req, res) => {
  try {
    const id = req.params.id;
    const updateDog = await Dog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateDog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

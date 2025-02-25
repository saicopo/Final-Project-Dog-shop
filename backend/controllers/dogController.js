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
    console.log("Req.body prima di multer:", req.body);
      const { Name, Age, Breed, Bio,owner } = req.body;
      let imagePath = 'https://i.postimg.cc/BbCTpM4s/cropped-pngtree-dog-logo-design-vector-icon-png-image-1824202.jpg';

      if (req.file) {
          imagePath = req.file.path;
      }

      const newDog = new Dog({
          Name,
          Age,
          Breed,
          Bio,
          Image: imagePath,
          owner: [owner]
      });
     
      console.log("Req.body dopo multer:", req.body); 
      const savedDog = await newDog.save();
console.log(savedDog);

      await Seller.findByIdAndUpdate(owner, {
          $push: { seller_dog: savedDog._id },
      });

      res.status(201).json(savedDog);
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
      const dogId = req.params.id;
      let updateData = req.body;

      const dog = await Dog.findById(dogId);
      if (!dog) {
          return res.status(404).json({ message: "Cucciolo non trovato" });
      }

      if (req.file) {
          updateData.Image = req.file.path; 
      } else {
          
          updateData.Image = dog.Image;
      }

      const updatedDog = await Dog.findByIdAndUpdate(dogId, updateData, {
          new: true,
      });

      res.status(200).json(updatedDog);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


export const uploadDogImage = async (req, res) => {
  try {
      const dogId = req.params.id;
      let imagePath = "https://i.postimg.cc/BbCTpM4s/cropped-pngtree-dog-logo-design-vector-icon-png-image-1824202.jpg"; // Immagine di default

      if (req.file) {
          imagePath = req.file.path;
      }

      const updatedDog = await Dog.findByIdAndUpdate(
          dogId,
          { Image: imagePath },
          { new: true }
      );

      if (!updatedDog) {
          return res.status(404).json({ message: "Cucciolo non trovato" });
      }

      res.status(200).json({
          message: "Immagine caricata con successo",
          dog: updatedDog,
      });
  } catch (error) {
      console.error("Errore durante il caricamento dell'immagine:", error);
      res
          .status(500)
          .json({ message: "Errore durante il caricamento dell'immagine" });
  }
};
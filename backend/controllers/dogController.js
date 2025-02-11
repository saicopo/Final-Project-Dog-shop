import Dog from "../models/dogsSchema.js";

const getAllDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDogsById = async (req, res) => {
    try {
      const dog = await Dog.findById(req.params.id); // Cerca il cane
  
      if (!dog) {
        return res.status(404).json({ message: "Cucciolo non trovato" }); // Se non trovato, esci subito
      }
  
      // Se il cane è stato trovato, invia *una sola* risposta
      res.status(200).json(dog);
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
const createDog = async (req, res) => {
  try {
    const dog = await Dog.create(req.body);
    res.status(200).json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteDog = async (req, res) => {
  try {
    const dog = await Dog.findByIdAndDelete(req.params.id);
    res.status(200).json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDog = async (req, res) => {
  try {
    const id = req.params.id;
    const dog = await Dog.findByIdAndUpdate(id, req.body);
    res.status(200).json(dog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllDogs,
  getDogsById,
  createDog,
  deleteDog,
  updateDog,
}
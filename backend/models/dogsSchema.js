import mongoose from "mongoose"; // Corretto l'errore di battitura
import 'dotenv/config';


const dogSchema = new mongoose.Schema({
  Name: String,
  Age: Number,
  Breed: String,
  Bio: String,
  Image: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sellers",
  },
});

const Dog = mongoose.model(process.env.DOG_COLLECTION, dogSchema); // Usa 'dogs' o process.env.DOG_COLLECTION se impostato


export default Dog;

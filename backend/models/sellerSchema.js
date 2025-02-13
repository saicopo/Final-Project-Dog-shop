import mongoose from "mongoose";
import 'dotenv/config';


const sellerSchema= new mongoose.Schema({
    Name: String,
    Surname: String,
    Email: String,
    Address: String,
    Image: String,
    seller_dog:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "dogs"
    }]
})
 const Seller = mongoose.model(process.env.SELLER_COLLECTION, sellerSchema);

 

 export default Seller
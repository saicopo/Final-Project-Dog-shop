import mongoose from "mongoose";

const sellerSchema= new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    address: String,
    image: String,
    seller_dog:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "dogs"
    }]
})
 const Seller = mongoose.model(process.env.SELLER_COLLECTION, sellerSchema);


 export default Seller
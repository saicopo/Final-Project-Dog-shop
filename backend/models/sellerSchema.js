import mongoose from "mongoose";

const sellerSchema= new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    address: String,
    image: String,
    dogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dog"
    }]
})
 const Seller = mongoose.model("sellers", sellerSchema);


 export default Seller
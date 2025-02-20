import mongoose from "mongoose";
import 'dotenv/config';
import bcrypt from 'bcrypt';

const sellerSchema= new mongoose.Schema({
    name: String,
    surname: String,
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    address: String,
    image: String,
    seller_dog:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "dogs"
    }]
})
 const Seller = mongoose.model(process.env.SELLER_COLLECTION, sellerSchema);

sellerSchema.pre('save', async function (next) {
     if (!this.isModified('password')) return next(); 
 
     try {
         const salt = await bcrypt.genSalt(10); 
         this.password = await bcrypt.hash(this.password, salt);
         next();
     } catch (err) {
         return next(err);
     }
 });
 
 
 sellerSchema.methods.comparePassword = async function (candidatePassword) {
     try {
         return await bcrypt.compare(candidatePassword, this.password);
     } catch (err) {
         return false;
     }
 };
 

 export default Seller
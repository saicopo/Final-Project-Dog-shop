import Dog from "../models/dogsSchema.js";
import Seller from "../models/sellerSchema.js";


export const getSeller = async (req, res) => {
  try {
      const sellers = await Seller.find().populate({
        path: "seller_dog",
        select: "dogs",
        model: Dog,
      });
      res.status(200).json(sellers);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

  export const getSellerById = async (req, res) => {
    try {
      const id = req.params.id;
        const seller = await Seller.findById({_id: id}).populate("seller_dog");
        if (!seller) {
            return res.status(404).json({ message: "Venditore non trovato" }); 
        }
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  export const createSeller = async (req, res) => {
    try {
      const seller = await Seller.create(req.body);
      res.status(200).json(seller);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const updateSeller = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, { new: true }).populate("seller_dog"); 
        res.status(200).json(updatedSeller);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  export const deleteSeller = async (req, res) => {
    try {
      const seller = await Seller.findByIdAndDelete(req.params.id); 
      res.status(200).json(seller);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }    
  };
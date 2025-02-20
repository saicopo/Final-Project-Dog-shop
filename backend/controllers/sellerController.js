import Dog from "../models/dogsSchema.js";
import Seller from "../models/sellerSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const seller = await Seller.findById({ _id: id }).populate("seller_dog");
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
    console.log(req.body);
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const seller_dog = req.body.seller_dog;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let imageUrl = "https://i.postimg.cc/Kjhzhrpb/Progetto-senza-titolo.jpg";
    console.log(req.file);

    if (req.file) {
      imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;
    }
    const newSeller = new Seller({
      name,
      surname,
      email,
      password: hashedPassword,
      address,
      image: imageUrl,
      seller_dog,
    });

    await newSeller.save();

    res
      .status(201)
      .json({ message: "Seller creato con successo", seller: newSeller });
  } catch (error) {
    console.error("Errore durante la creazione del seller:", error);

    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.Email === 1
    ) {
      return res.status(400).json({ message: "Email già esistente." });
    }

    res
      .status(500)
      .json({ message: "Errore durante la creazione del seller." });
  }
};

export const updateSeller = async (req, res) => {
  try {
    const id = req.params.id;
    let updateData = req.body;

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedSeller = await Seller.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("seller_dog");
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

export const uploadSellerImage = async (req, res) => {
  try {
    const sellerId = req.params.id;
    let imagePath = "https://i.postimg.cc/Kjhzhrpb/Progetto-senza-titolo.jpg";

    if (req.file) {
      imagePath = req.file.path;
    }

    const updatedSeller = await Seller.findByIdAndUpdate(
      sellerId,
      { Image: imagePath },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: "Venditore non trovato" });
    }

    res.status(200).json({
      message: "Immagine caricata con successo",
      seller: updatedSeller,
    });
  } catch (error) {
    console.error("Errore durante il caricamento dell'immagine:", error);
    res
      .status(500)
      .json({ message: "Errore durante il caricamento dell'immagine" });
  }
};

export const loginSeller = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    const seller = await Seller.findOne({ email });

    if (!seller || !bcrypt.compareSync(password, seller.password)) {
      return res.status(401).json({ message: "Credenziali non valide" });
    }

    const token = jwt.sign(
      {
        id: seller._id,
        profileImage: seller.image,
      },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore durante il login" });
  }
};

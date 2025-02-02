import moongoose from "mongoose";

const dogSchema = new moongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  bio: String,
  image: String,
});

const Dog = moongoose.model("dogs", dogSchema);

export default Dog;

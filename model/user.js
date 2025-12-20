import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    minlength: 8,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  Item: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});
const User = mongoose.model("User", userSchema);

export default User;

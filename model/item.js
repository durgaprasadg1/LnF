import mongoose from "mongoose";
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
    required: true,
  },
  lostAt: {
    type: String,
    minlength: 2,
  },
  foundAt: {
    type: String,
    minlength: 2,
  },
  isLost: {
    type: Boolean,
    default: false,
  },
  isFound: {
    type: Boolean,
    default: false,
  },
});
const Item = mongoose.model("Item", itemSchema);

export default Item;

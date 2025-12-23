import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
});

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);

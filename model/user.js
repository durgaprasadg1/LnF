import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      match : [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must have atleast one lowercase, uppercase, digit, special, character"],
    },

    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],

    profilePicture: {
      url: String,
      filename: String,
    },

    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },

    role: {
      type: String,
      enum: ["student", "staff", "admin"],
      default: "student",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true } 
);
export default mongoose.models.User || mongoose.model("User", userSchema);

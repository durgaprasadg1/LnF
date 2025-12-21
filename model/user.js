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
      minlength: 8,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must have atleast one lowercase, uppercase, digit, special character",
      ],
    },

    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },

    role: {
      type: String,
      enum: ["student", "staff", "admin"],
      default: "student",
    },

    department: {
      type: String,
      enum: [
        "Computer Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Non-teaching Staff",
        "Teaching Staff",
        "Libary-staff",
        "Other",
      ],
      default: "Other",
    },

  

    profilePicture: {
      url: String,
      filename: String,
    },

    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],

    itemsReturned: {
      type: Number,
      default: 0,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    badgeColor: {
      type: String,
      default: "#3b82f6",
    },

    profileColor: {
      type: String,
      default: "#f3f4f6",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

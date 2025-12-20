import mongoose from "mongoose";
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    lostAt: {
      type: String,
      trim: true,
    },

    foundAt: {
      type: String,
      trim: true,
    },

    isLost: {
      type: Boolean,
      default: false,
    },

    isFound: {
      type: Boolean,
      default: false,
    },

    itemImage: {
      url: String,
      filename: String,
    },

    category: {
      type: String,
      enum: [
        "Electronics",
        "Books",
        "Documents",
        "Accessories",
        "Clothing",
        "Other",
      ],
      default: "Other",
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reportedAt: {
      type: Date,
      default: Date.now,
    },

    resolvedAt: {
      type: Date,
    },

    isResolved: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true } 
);


export default mongoose.models.Item || mongoose.model("Item", itemSchema);

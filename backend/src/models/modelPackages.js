//Aca irán los campos que se utilizarán en modelos según la colección
import mongoose, { Schema, model } from "mongoose";

const packagesSchema = new Schema(
  {
    trackingNumber: {
      type: String,
    },
    weight: {
      type: String,
    },
    dimensions: {
      type: String,
    },
    description: {
      type: String,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "drivers",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clients",
    },
    status: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    strick: false,
  },
);

export default model("packages", packagesSchema);
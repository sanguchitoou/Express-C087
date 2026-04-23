//Aca irán los campos que se utilizarán en modelos según la colección
import mongoose, { Schema, model } from "mongoose";

const clientsSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    isVerified: {
      type: Boolean,
    },
    loginAttemps: {
      type: Number,
    },
    timeOut: {
      type: Date,
    },
  },
  {
    timestamps: true,
    strick: false,
  },
);

export default model("clients", clientsSchema);
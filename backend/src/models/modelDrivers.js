//Aca irán los campos que se utilizarán en modelos según la colección
import mongoose, { Schema, model } from "mongoose";

const driversSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    licenseNumber: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    isActive: {
      type: Boolean,
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

export default model("drivers", driversSchema);
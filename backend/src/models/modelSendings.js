//Aca irán los campos que se utilizarán en modelos según la colección
import mongoose, { Schema, model } from "mongoose";

const sendingsSchema = new Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "packages",
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "routes",
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "drivers",
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicles",
    },
    departureDate: {
      type: Date,
    },
    deliveryDate: {
      type: Date,
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

export default model("sendings", sendingsSchema);
//Aca irán los campos que se utilizarán en modelos según la colección
import mongoose, { Schema, model } from "mongoose";

const routesSchema = new Schema(
  {
    origin: {
      type: String,
    },
    destination: {
      type: String,
    },
    distance: {
      type: String,
    },
    estimatedTime: {
      type: String,
    },
  },
  {
    timestamps: true,
    strick: false,
  },
);

export default model("routes", routesSchema);
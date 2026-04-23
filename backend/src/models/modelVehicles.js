//Aca irán los campos que se utilizarán en modelos según la colección
import mongoose, { Schema, model } from "mongoose";

const vehiclesSchema = new Schema(
  {
    plate: {
      type: String,
    },
    model: {
      type: String,
    },
    capacity: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "drivers",
    },
  },
  {
    timestamps: true,
    strick: false,
  },
);

export default model("vehicles", vehiclesSchema);
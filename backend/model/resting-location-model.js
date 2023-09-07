import mongoose from "mongoose";

const Schema = mongoose.Schema;

const locationSchema = new Schema({

  locationName: {
    type: String,
    required: true
  },

  locationPlaced: {
    type: String,
    required: true
  },

  availability: {
    type: Number,
    required: true
  },

  locationFeatures: {
    type: [String],
    required: true
  },

  Reserved: [{
    no: Number,
    qrCode: Number
  }],

  currentNoReserved: {
    type: Number,
  }

});

const RestingLocations = mongoose.model("RestingLocations", locationSchema);

export default RestingLocations;

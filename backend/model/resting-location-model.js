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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isGetsIn: {
      type: Boolean,
      default: false
    },
    getsInTime: {
      type: Date,
      default: new Date()
    },
    no: Number,
    qrCode: Number
  }],

  currentNoReserved: {
    type: Number,
    default: 0
  },

  avgTime: {
    type: Number,
    default: 0
  },

  count: {
    type: Number,
    default: 0
  }

});

const RestingLocations = mongoose.model("RestingLocations", locationSchema);

export default RestingLocations;

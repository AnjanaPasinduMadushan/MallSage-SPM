import mongoose from "mongoose";

const Schema = mongoose.Schema;

const luggagetrackingSchema = new Schema({
  luggageID: {
    type: String,
    required: false,
  },

  CustomerID: {
    type: String,
    required: true,
  },

  CustomerEmail: {
    type: String,
    required: true,
  },

  ShopID: {
    type: String,
    required: true,
  },

  BagNo: {
    type: String,
    required: true,
  },

  TimeDuration: {
    type: String,
    required: false,
  },

  SecurityCheckPoint: {
    type: String,
    required: false,
  },

  SecurityID: {
    type: String,
    required: false,
  },

  SecurityAdminID: {
    type: String,
    required: false,
  },

  isComplete: {
    type: Boolean,
    default: false
  },

});

const Luggage = mongoose.model("Luggage", luggagetrackingSchema);

export default Luggage;

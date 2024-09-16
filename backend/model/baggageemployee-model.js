import mongoose from "mongoose";
// import Luggage from "./luggage-model";

const Schema = mongoose.Schema;

const shopDetailsForBaggageSchema = new Schema({
  ShopID: {
    type: String,
    ShopID: false,
    required: false,
  },

  ShopName: {
    type: String,
    required: false,
  },
  ShopToken: {
    type: String,
    required: false,
  },
  ShopCollected: {
    type: Boolean,
    required: false,
  },
});

const baggageEmployeeSchema = new Schema({
  BaggageEmployeeID: {
    type: String,
    required: true,
  },

  Name: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Address: {
    type: String,
    required: false,
  },

  ShopDetails: {
    type: [shopDetailsForBaggageSchema],
    required: false,
  },

  TaskNumber: {
    type: Number,
    required: false,
  },

  CustomerID: {
    type: String,
    required: false,
  },

  CustomerEmail: {
    type: String,
    required: false,
  },

  BaggageConfirmed: {
    type: Boolean,
    required: false,
  },

  Completed: {
    type: Boolean,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
});

const BaggageEmployee = mongoose.model(
  "BaggageEmployee",
  baggageEmployeeSchema
);

export default BaggageEmployee;

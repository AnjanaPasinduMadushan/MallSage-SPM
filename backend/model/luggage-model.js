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
    required: false,
  },

  ShopName: {
    type: String,
    required: false,
  },

  BagNo: {
    type: String,
    required: true,
  },

  ShopToken: {
    type: String,
    required: true,
  },

  CustomerToken: {
    type: String,
    required: true,
  },

  Bill: {
    type: String,
    required: true,
  },

  TimeDuration: {
    type: String,
    required: false,
  },

  Date: {
    type: Date,
    required: true,
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

  Exit: {
    type: String,
    required: false,
  },


  isComplete: {
    type: Boolean,
    default: false,
    required: false,
  },

  CollectedDate: {
    type: Date,
    required: false,
  },

  ExitPoint: {
    type: String,
    required: false,
  },

  RequestedDeliveryTime: {
    type: String,
    required: false,
  },

  RequestedDeliveryDate: {
    type: Date,
    required: false,
  },

  AssignedBaggageEmployeeID: {
    type: String,
    required: false,
  },

  AssignedBaggageEmployeeName: {
    type: String,
    required: false,
  },

  AssignedBaggageEmployeeEmail: {
    type: String,
    required: false,
  },

  CompletedDate: {
    type: Date,
    required: false,
  },

  isDeliveryRequested: {
    type: Boolean,
    default: false,
    required: false,
  },

  isSecurityConfirmed: {
    type: Boolean,
    default: false,
    required: false,
  },

  isCustomerConfirmed: {
    type: Boolean,
    default: false,
    required: false,
  },

});

const Luggage = mongoose.model("Luggage", luggagetrackingSchema);

export default Luggage;

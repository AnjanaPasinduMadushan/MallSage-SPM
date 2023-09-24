import mongoose from "mongoose";

const Schema = mongoose.Schema;

const securitySchema = new Schema({
  SecurityAdminID: {
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
    required: true,
  },

  Department: {
    type: String,
    required: true,
  },

  CheckPointID: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    required: false,
  },


});

const SecurityAdmin = mongoose.model("Security", securitySchema);

export default SecurityAdmin;

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  isFacilityAdmin: {
    type: Boolean,
  },

  isShop: {
    type: Boolean,
  },

  isSecurityAdmin: {
    type: Boolean,
  },

  isSecurity: {
    type: Boolean,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const Admins = mongoose.model("Administration", adminSchema);

export default Admins;

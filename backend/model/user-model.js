import mongoose from "mongoose";

const Schema = mongoose.Schema;

//const {roles}= require("./roles")

const userSchema = new Schema({


  name: {
    type: String,
    required: true
  },

  mobile: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["customer", "admin", "securityadmin", "securityofficer", "shop"],
    default: "customer"
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  }
})

const User = mongoose.model("User", userSchema);

export default User;

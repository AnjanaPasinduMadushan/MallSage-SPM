import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shopSchema = new Schema({
  ShopID: {
    type: String,
    required: true,
  },

  BuisnessRegNumber: {
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

  ShopManagerName: {
    type: String,
    required: true,
  },

  NumerOfEmployees: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

});

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;

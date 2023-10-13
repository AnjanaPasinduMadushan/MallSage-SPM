import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogScema = new Schema({

  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  shop: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true
  },
  images: [{
    name: String,
    url: String
  }],
})

const Blog = mongoose.model("Blog", blogScema);

export default Blog;
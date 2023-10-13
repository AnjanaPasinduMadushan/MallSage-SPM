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
  }
})

const Blog = mongoose.model("Blog", blogScema);

export default Blog;
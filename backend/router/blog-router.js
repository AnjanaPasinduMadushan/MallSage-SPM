import {createBlog, deleteBlog, getBlog, getBlogs, updateBlog} from "../controller/blog-controller.js";
import express from "express";
import { checkToken } from "../middlewares/user.js";

const blog_router = express.Router();

blog_router.post("/create", checkToken, createBlog);
blog_router.get("/getOne/:id", getBlog);
blog_router.get("/readAll", getBlogs);
blog_router.put("/update/:id", updateBlog);
blog_router.delete("/remove/:id", deleteBlog);

export default blog_router;
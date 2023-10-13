import { createBlog, deleteBlog, getBlog, getAllBlogs, updateBlog, deleteImg } from "../controller/blog-controller.js";
import express from "express";
import { checkShop, checkToken } from "../middlewares/user.js";
import { upload } from "../configs/multerConfig.js";

const blog_router = express.Router();

blog_router.post("/create", checkToken, checkShop, upload.array('image'), createBlog);
blog_router.get("/getOne/:id", checkToken, checkShop, getBlog);
blog_router.get("/getBlogs", checkToken, checkShop, getAllBlogs);
blog_router.post("/update/:id", checkToken, checkShop, upload.array('image'), updateBlog);
blog_router.delete("/remove/:id", deleteBlog);
blog_router.delete("/removeImg/:id/:name", deleteImg);

export default blog_router;
import { createBlog, deleteBlog, getBlog, getShopBlogs, updateBlog, deleteImg, getAllBlogs } from "../controller/blog-controller.js";
import express from "express";
import { checkCustomer, checkShop, checkToken } from "../middlewares/user.js";
import { upload } from "../configs/multerConfig.js";

const blog_router = express.Router();

blog_router.post("/create", checkToken, checkShop, upload.array('image'), createBlog);
blog_router.get("/getOne/:id", checkToken, getBlog);
blog_router.get("/getBlogs", checkToken, checkShop, getShopBlogs);
blog_router.post("/update/:id", checkToken, checkShop, upload.array('image'), updateBlog);
blog_router.delete("/remove/:id", deleteBlog);
blog_router.delete("/removeImg/:id/:name", deleteImg);
blog_router.get("/getAll", checkToken, checkCustomer, getAllBlogs);

export default blog_router;
import { addShop, getOneShop, getShops,deleteShop, updateShop, getShopByUserId } from '../controller/shop-controller.js';
import { checkToken, checkAdmin } from '../middlewares/user.js';
import express from 'express';

const shop_router = express.Router();

shop_router.post("/addShop", addShop);
shop_router.get("/", getShops);
shop_router.get("/:shopId", getOneShop);
shop_router.get("/shopbyuser/:userId", getShopByUserId);
shop_router.patch("/updateShop/:id", updateShop);
shop_router.delete("/deleteShop/:id", deleteShop);

export default shop_router;
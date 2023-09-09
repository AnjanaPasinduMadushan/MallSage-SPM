import { addLuggage, getOneLuggage,getLuggages,deleteLuggage,updateLuggage } from '../controller/luggage-controller.js';
import { checkToken, checkAdmin } from '../middlewares/user.js';
import express from 'express';

const luggage_router = express.Router();

luggage_router.post("/addLuggage", addLuggage);
luggage_router.get("/", getLuggages);
luggage_router.get("/:luggageId", getOneLuggage);
luggage_router.patch("/updateLuggage/:id", updateLuggage);
luggage_router.delete("/deleteLuggage/:id", deleteLuggage);

export default luggage_router;
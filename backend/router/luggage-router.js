import { addLuggage, getOneLuggage,getLuggages,deleteLuggage,updateLuggage } from '../controller/luggage-controller.js';
import { checkToken, checkAdmin } from '../middlewares/user.js';
import express from 'express';

const luggage_router = express.Router();

luggage_router.post("/addLuggage", addLuggage);
luggage_router.get("/", getLuggages);
luggage_router.get("/:luggageId", getOneLuggage);
luggage_router.patch("/updateLuggage/:id", updateLuggage);
luggage_router.delete("/deleteLuggage/:id", deleteLuggage);
// location_router.patch("/decreaseReserved/:id", decreaseNoAndDeleteReserved);
// location_router.patch("/updateToTrue/:id", updateGetsIn);
// location_router.delete("/:id", checkToken, checkAdmin, deleteLocation);

export default luggage_router;
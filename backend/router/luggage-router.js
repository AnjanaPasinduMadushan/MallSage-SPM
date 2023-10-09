import { addLuggage, getOneLuggage,getLuggages,deleteLuggage,updateLuggage, getallLuggages, getLuggageByCustomerEmail, gettotalLuggages } from '../controller/luggage-controller.js';
import { checkToken, checkAdmin } from '../middlewares/user.js';
import express from 'express';

const luggage_router = express.Router();

luggage_router.get("/getallLuggagescustomer/:email", gettotalLuggages);
luggage_router.get("/getLuggagebyUseremail/:email", getallLuggages);
luggage_router.post("/addLuggage", addLuggage);
luggage_router.get("/", getLuggages);
luggage_router.get("/:luggageId", getOneLuggage);
luggage_router.patch("/updateLuggage/:id", updateLuggage);
// luggage_router.get("/getLuggagebyUseremail/:email", getLuggageByCustomerEmail);
luggage_router.delete("/deleteLuggage/:id", deleteLuggage);

export default luggage_router;
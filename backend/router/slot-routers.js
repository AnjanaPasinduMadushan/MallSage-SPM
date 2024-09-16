import {createParkingSlot,getParkingSlotById,
    getAllParkingSlots,deleteParkingSlot,
    getAvailableSlots,slotOccupide,endOccupide} from '../controller/slot-controller.js';
import express  from 'express';

const slot_router = express.Router();

slot_router.post("/add",createParkingSlot);
slot_router.get("/getAll",getAllParkingSlots);
slot_router.get("/get/:id",getParkingSlotById);
slot_router.delete("/delete/:id",deleteParkingSlot);
slot_router.get("/getSlot/:type",getAvailableSlots);
slot_router.patch("/start/:id",slotOccupide);
slot_router.patch("/end/:id",endOccupide);

export default slot_router;
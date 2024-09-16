import { addBaggageEmployee } from '../controller/baggageemployee-controller.js';
import { checkToken, checkAdmin } from '../middlewares/user.js';
import express from 'express';

const baggageEmployee_router = express.Router();

baggageEmployee_router.post("/addBaggageEmployee", addBaggageEmployee);

export default baggageEmployee_router;
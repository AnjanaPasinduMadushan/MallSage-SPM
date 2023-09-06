import { addSubAdmins } from '../controller/admin-controller.js';
import { checkToken, checkAdmin } from '../middlewares/user.js';
import express from 'express';

const admin_router = express.Router();

admin_router.post("/add-sub-admin", checkToken, checkAdmin, addSubAdmins);


export default admin_router;
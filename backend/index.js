import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db.js';
import cookieParser from 'cookie-parser';

//Routes file paths
import user_router from './router/user-routes.js';
import admin_router from './router/admin-router.js';
import location_router from './router/resting-location-router.js';
import luggage_router from './router/luggage-router.js';

const app = express();

const PORT = 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(cookieParser());

//routes are declared here
app.use('/user', user_router);
app.use('/sub-admin', admin_router);
app.use('/restingLocation', location_router);
app.use('/luggage', luggage_router);

//db connection
db();


app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
})
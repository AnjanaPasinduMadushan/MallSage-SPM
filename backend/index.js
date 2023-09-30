import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './configs/mongooseConfig.js';
import cookieParser from 'cookie-parser';

//Routes file paths
import user_router from './router/user-routes.js';
import admin_router from './router/admin-router.js';
import location_router from './router/resting-location-router.js';
import blog_router from './router/blog-router.js';
import luggage_router from './router/luggage-router.js';
import shop_router from './router/shop-router.js';
import slot_router from './router/slot-routers.js';
//import reservation_router from './router/reservation-routers.js';

import baggageEmployee_router from './router/BaggageEmployee-router.js'
const app = express();

const PORT = 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(cookieParser());

//routes are declared here
app.use('/user', user_router);
app.use('/sub-admin', admin_router);
app.use('/restingLocation', location_router);
app.use('/blog', blog_router);
app.use('/luggage', luggage_router);
app.use('/shop', shop_router);
app.use('/slot', slot_router);
//app.use('/reservation', reservation_router);

app.use('/baggage',baggageEmployee_router);

//db connection
db();


app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
})
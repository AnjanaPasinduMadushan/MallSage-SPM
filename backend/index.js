import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db.js';
import cookieParser from 'cookie-parser';

//Routes file paths
import user_router from './router/user-routes.js';


const app = express();

const PORT = 5000;

app.use(cors({ origin: "http://127.0.0.1:5000", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//routes are declared here
app.use('/user', user_router);


//db connection
db();


app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
})
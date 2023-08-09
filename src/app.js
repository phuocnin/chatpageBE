import express from "express";
import dotenv from "dotenv";
import createHttpError from "http-errors";
import routers from "./routers/index";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
//config dotenv
dotenv.config()
// connect mongodb
const { DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to Mongodb.");
});
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//enable cookie parser
app.use(cookieParser());
app.use('/api/v1/', routers);
app.use(async (req, res, next) => {
    next(createHttpError.NotFound("This route does not exist."));
});

//error handling
app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});



export default app;
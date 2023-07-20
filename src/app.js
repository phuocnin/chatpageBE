import express from "express";
import dotenv from "dotenv";
import createHttpError from "http-errors";
import routers from "./routers/index";
import bodyParser from "body-parser";
//config dotenv
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    throw createHttpError.RequestTimeout("this route has an error");
});
app.post("/test", (req, res) => {
    throw createHttpError.BadRequest("this route has an error");
});

app.use('/api/v1/', routers)

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
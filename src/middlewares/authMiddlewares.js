import createHttpError from "http-errors";
import jwt from "jsonwebtoken"

export default function (req, res, next) {
    if (!req.headers["authorization"])
        return next(createHttpError.Unauthorized());
    const bearerToken = req.headers["authorization"];
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_SECRETKEY_TOKEN, (err, payload) => {
        if (err) {
            return next(createHttpError.Unauthorized());
        }
        console.log(payload);
        req.user = payload;
        next();
    });
}
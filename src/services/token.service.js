import jwt from "jsonwebtoken";
export const generateToken = async (payload, expiresIn, secret) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret,
            { expiresIn: expiresIn },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve(token);
                }
            }
        );
    });
};
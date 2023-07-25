import jwt from "jsonwebtoken";
export const generateToken = async (payload, expiresIn, secret) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret,
            { expiresIn: expiresIn },
            (error, token) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

export const verifyToken = async (refresh_token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refresh_token, secret, (error, decode) => {
            if (error) {
                reject(error)
            }
            else resolve(decode)
        })
    })
}
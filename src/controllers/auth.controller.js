import authService from "../services/auth.service.js"

const register = async (req, res, next) => {
    try {
        const newUser = await authService.createUser(req.body)
        res.json(newUser);

    } catch (err) {
        next(err);
    }
}


module.exports = {
    register,
}
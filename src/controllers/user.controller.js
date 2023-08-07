import userService from '../services/user.service.js'
import createHttpError from 'http-errors';
const searchUser = async (req, res, next) => {
    try {
        const keyword = req.query.search;
        if (!keyword) {
            console.log("Please add a search query first");
            throw createHttpError.BadRequest("Oops...Something went wrong !");
        }
        const users = await userService.searchUser(keyword);
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    searchUser
}
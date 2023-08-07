import createHttpError from "http-errors";
import { UserModel } from "../models/index.js";

const findUser = async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) throw createHttpError.BadRequest("Không tìm thấy user.");
    return user;
}
const searchUser = async (keyword) => {
    const users = await UserModel.find({
        $or: [
            { name: { $regex: keyword, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
        ],
    });
    return users;
}
module.exports = {
    findUser,
    searchUser
}
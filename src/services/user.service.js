import createHttpError from "http-errors";
import { UserModel } from "../models/index.js";

const findUser = async (userId) => {
    const user = await UserModel.findById(userId);
    if (!user) throw createHttpError.BadRequest("Không tìm thấy user.");
    return user;
}

module.exports = {
    findUser,
}
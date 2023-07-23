import createHttpError from "http-errors";
import { UserModel } from "../models/index.js";
import validator from "validator";

const createUser = async (data) => {
    const { name, email, picture, password } = data;
    // kiểm tra đã đủ thông tin chưa
    if (!name || !email || !password) {
        throw createHttpError.BadRequest('Bạn chưa điền đầy đủ thông tin')
    }
    //kiểm tra email
    if (!validator.isEmail(email)) {
        throw createHttpError.BadRequest('Email không hợp lệ.')
    }
    const checkDb = await UserModel.findOne({ email });
    if (checkDb) {
        throw createHttpError.Conflict(
            "Email đã tồn tại."
        );
    }
    // kiểm tra password
    if (!validator.isStrongPassword(password, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        returnScore: true,
    })) {
        throw createHttpError.BadRequest('Mật khẩu cần ít nất 6 kí tự, chữ hoa, chữ thường, số')

    }
    const user = await new UserModel({
        name,
        email,
        picture: picture || process.env.PICTURE_DEFAULT,
        password,
    }).save();
    return user
}

module.exports = {
    createUser
}


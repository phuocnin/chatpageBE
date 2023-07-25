import createHttpError from "http-errors";
import { UserModel } from "../models/index.js";
import validator from "validator";
import { hassPassword, comparePassword } from "../utils/hashPassword.utils.js";

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
    //hass password
    const hassPass = await hassPassword(password);
    const user = await new UserModel({
        name,
        email,
        picture: picture || process.env.PICTURE_DEFAULT,
        password: hassPass,
    }).save();
    return user
}

const signUser = async (data) => {
    const { email, password } = data;
    const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

    //kiểm tra email đã tồn tại chưa
    if (!user) throw createHttpError.NotFound("Thông tin không hợp lệ.");
    // kiểm tra password
    const checkPass = await comparePassword(password, user.password);
    if (!checkPass) throw createHttpError.NotFound("Mật khẩu không hợp lệ.");

    return user;

}
module.exports = {
    createUser,
    signUser,
}


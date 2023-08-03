import { MessageModel } from "../models";

const createMessage = async (data) => {
    const newMessage = await MessageModel.create(data);
    if (!newMessage)
        throw createHttpError.BadRequest("Oops...Something went wrong !");
    return newMessage;
}
const populateMessage = async (message_id) => {
    const populateMessage = await MessageModel.findOne({ _id: message_id })
        .populate("sender", "-password")
        .populate("conversation")
    if (!populateMessage)
        throw createHttpError.BadRequest("Oops...Something went wrong !");
    return populateMessage
}
module.exports = {
    createMessage,
    populateMessage
}
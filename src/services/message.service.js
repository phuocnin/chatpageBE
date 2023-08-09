import createHttpError from "http-errors";
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
const getMessage = async (convo_id) => {
    const getMessage = await MessageModel.find({ conversation: convo_id })
        .populate('sender', '-password')
        .populate('conversation')
        .sort({ updatedAt: -1 })

    return getMessage
}
const deleteMessage = async (sender_id, message_id) => {
    const result = await MessageModel.deleteOne({ _id: message_id, sender: sender_id });
    if (!result.deletedCount) throw createHttpError.BadRequest("Can't delete messages")
    return result;
}
module.exports = {
    createMessage,
    populateMessage,
    getMessage,
    deleteMessage
}
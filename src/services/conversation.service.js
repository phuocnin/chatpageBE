import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../models/index.js";

const doesConversation = async (sender_id, receiver_id) => {
    let convos = await ConversationModel.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: sender_id } } },
            { users: { $elemMatch: { $eq: receiver_id } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    if (!convos)
        throw createHttpError.BadRequest("Oops...Something went wrong !");

    //populate message model
    convos = await UserModel.populate(convos, {
        path: "latestMessage.sender",
        select: "name email picture status",
    });
    console.log(convos);
    return convos[0];
};

const createConversation = async (data) => {
    const newConvo = await ConversationModel.create(data);
    if (!newConvo)
        throw createHttpError.BadRequest("Oops...Something went wrong !");
    return newConvo;
};

const populateConversation = async (id, fieldToPopulate, fieldsToRemove) => {
    const populatedConvo = await ConversationModel.findOne({ _id: id })
        .populate(fieldToPopulate, fieldsToRemove);
    if (!populatedConvo)
        throw createHttpError.BadRequest("Oops...Something went wrong !");
    return populatedConvo;
};

const getconversation = async (sender_id) => {
    const conversation = await ConversationModel
        .find({ users: { $elemMatch: { $eq: sender_id } } })
        .populate("users", "-password")
        .populate("admin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 }) //sắp xếp theo trường updatedAt giảm dần  

    return conversation
}

const updateLatestMessage = async (convo_id, message) => {
    const updateLMSG = await ConversationModel.findByIdAndUpdate(convo_id, { latestMessage: message });
    if (!updateLMSG)
        throw createHttpError.BadRequest("Oops...Something went wrong !");

    return updateLMSG;
}
module.exports = {
    doesConversation,
    createConversation,
    populateConversation,
    getconversation,
    updateLatestMessage
}
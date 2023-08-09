import createHttpError from "http-errors";
import messageService from '../services/message.service.js'
import { updateLatestMessage } from '../services/conversation.service.js'
const sendMessage = async (req, res, next) => {
    try {
        const sender_id = req.user.userId;
        const { convo_id, message, file } = req.body
        if (!(convo_id && (message || file))) {
            throw createHttpError.BadGateway("Error!!! ")
        }
        else {
            let messageData = {
                sender: sender_id,
                message,
                conversation: convo_id,
                file
            }
            const newMessage = await messageService.createMessage(messageData);
            const populateMessage = await messageService.populateMessage(newMessage._id);
            await updateLatestMessage(convo_id, newMessage);
            res.json(populateMessage)
        }
    } catch (error) {
        next(error)
    }
}

const getMessage = async (req, res, next) => {
    try {
        const convo_id = req.params.convo_id;
        if (!convo_id) {
            throw createHttpError.BadGateway("Error!!! no convo id")
        }
        const message = await messageService.getMessage(convo_id)
        res.status(200).json(message)
    } catch (error) {
        next(error)
    }
}
const deleteMessage = async (req, res, next) => {
    try {
        const message_id = req.params.message_id;
        const sender_id = req.user.userId;
        if (!message_id) throw createHttpError.BadGateway("Error!!! no message id");
        const result = await messageService.deleteMessage(sender_id, message_id)
        res.status(200).json({ message: 'Delete message successfully.' })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    sendMessage,
    getMessage,
    deleteMessage,
}
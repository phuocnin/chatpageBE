import conversationService from "../services/conversation.service.js"
import createHttpError from "http-errors"
import userService from "../services/user.service.js"

const create_open_convarsation = async (req, res, next) => {
    try {
        const sender_id = req.user.userId;
        const { receiver_id } = req.body;

        // kiểm tra có receiver không
        if (!receiver_id) throw createHttpError.BadGateway("không có người dùng")

        // kiểm tra cuộc trò chuyện với receiver đó có tồn tại không
        const conversation = await conversationService.doesConversation(sender_id, receiver_id)
        if (conversation) {
            res.json(conversation)
        } else {
            console.log(receiver_id, sender_id);
            let receiver_user = await userService.findUser(receiver_id);
            let convoData = {
                name: receiver_user.name,
                isGroup: false,
                users: [sender_id, receiver_id]
            }
            const newConvo = await conversationService.createConversation(convoData)
            const populatedConvo = await conversationService.populateConversation(
                newConvo._id,
                "users",
                "-password"
            );
            res.status(200).json(populatedConvo);
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    create_open_convarsation,
}
import express from "express"
import trimRequest from "trim-request"
import authMiddlewares from "../middlewares/authMiddlewares.js"
import conversationsControllers from '../controllers/conversation.controller.js'

const router = express.Router();

router.route('/').post(trimRequest.all, authMiddlewares, conversationsControllers.create_open_conversation)
router.route('/getconversation').get(trimRequest.all, authMiddlewares, conversationsControllers.getconversation)

export default router;
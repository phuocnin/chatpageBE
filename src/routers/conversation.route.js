import express from "express"
import trimRequest from "trim-request"
import authMiddlewares from "../middlewares/authMiddlewares.js"
import conversationsControllers from '../controllers/conversation.controller.js'

const router = express.Router();

router.route('/').post(trimRequest.all, authMiddlewares, conversationsControllers.create_open_convarsation)

export default router;
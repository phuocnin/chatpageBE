import express from 'express'
import trimRequest from 'trim-request'
import authMiddlewares from '../middlewares/authMiddlewares.js'
import messageController from '../controllers/message.controller.js'
const router = express.Router()

router.route('/').post(trimRequest.all, authMiddlewares, messageController.sendMessage)
router.route('/:convo_id').get(trimRequest.all, authMiddlewares, messageController.getMessage)

export default router
import express from 'express'
import trimRequest from 'trim-request'
import authMiddlewares from '../middlewares/authMiddlewares';
import userController from '../controllers/user.controller.js'
const router = express.Router();

router.route('/').get(trimRequest.all, authMiddlewares, userController.searchUser);

export default router;
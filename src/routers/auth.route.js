import express from 'express'
import authControllers from '../controllers/auth.controller.js'
import trimRequest from 'trim-request';
const router = express.Router();

router.route('/register').post(trimRequest.all, authControllers.register)

export default router;
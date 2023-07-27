import express from 'express'
import authControllers from '../controllers/auth.controller.js'
import trimRequest from 'trim-request';
import authMiddlewares from '../middlewares/authMiddlewares.js';
const router = express.Router();

router.route('/register').post(trimRequest.all, authControllers.register)
router.route('/login').post(trimRequest.all, authControllers.login)
router.route('/logout').post(trimRequest.all, authControllers.logout)
router.route('/refreshtoken').post(trimRequest.all, authControllers.refreshToken)
router.route('/testmiddleware').get(trimRequest.all, authMiddlewares, (req, res) => {
    res.send(req.user)
})
export default router;
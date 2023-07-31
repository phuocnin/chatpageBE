import express from 'express'
import authRoutes from './auth.route.js'
import conversationRoute from './conversation.route.js'
const router = express.Router();

router.use('/auth', authRoutes)
router.use('/conversation', conversationRoute)

export default router;
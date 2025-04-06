import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.constroller.js'

const router = express.Router()

router.post('/send/:id', protectRoute, sendMessage)

router.get('/user', protectRoute, getUsersForSidebar )

router.get('/:id', protectRoute, getMessages)

export default router
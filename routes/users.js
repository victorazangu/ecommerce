import express from 'express'
import {
    createUser,
    getAllUsers,
    getUserById,
    login,
} from '../controllers/users.js'

const router = express.Router()

router.post('/register', createUser)
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/login', login)
export default router

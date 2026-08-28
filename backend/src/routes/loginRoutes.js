import express from 'express'
import { login, registrar } from '../controllers/authController.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', registrar)

export default router
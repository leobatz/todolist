import express from 'express'
import { usuarioAtual } from '../controllers/currentUserController.js'

const router = express.Router()

router.get('/', usuarioAtual)

export default router
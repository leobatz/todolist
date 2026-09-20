import express from 'express'
import { listarEventos, criarEvento, atualizarEvento, deletarEvento } from '../controllers/eventoController.js'

const router = express.Router()

router.get('/', listarEventos)
router.post('/', criarEvento)
router.put('/:id', atualizarEvento)
router.delete('/:id', deletarEvento)

export default router
import express from 'express'
import { listarCategorias, criarCategoria, atualizarCategoria, deletarCategoria } from '../controllers/categoriaEventoController.js'

const router = express.Router()

router.get('/', listarCategorias)
router.post('/', criarCategoria)
router.put('/:id', atualizarCategoria)
router.delete('/:id', deletarCategoria)

export default router
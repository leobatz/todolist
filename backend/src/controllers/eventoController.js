import { Evento, CategoriaEvento } from '../models/Index.js'

export const listarEventos = async (req, res) => {
    try {
        const userId = req.userId

        const eventos = await Evento.findAll({ where: { userId } })

        return res.status(200).json(eventos)
    } catch (error) {
        console.error('Erro ao listar eventos: ', error)
        return res.status(500).json( {error: 'Erro interno do servidor'})
    }
}

export const criarEvento = async (req, res) => {
    try {
        const userId = req.userId
        const { titulo, data, hora, categoriaEventoId } = req.body

        const categoriaEvento =  await CategoriaEvento.findOne({ where: { userId, categoriaEventoId } })

        if (!categoriaEvento) {
            return res.status(404).json({ message: 'Categoria não encontrada.' })
        }

        const novoEvento = await Task.create({ titulo, data, hora, categoriaEventoId, userId })

        return res.status(201).json({ message: 'Evento criado com sucesso', novoEvento })
    } catch (error) {
        console.error('Erro ao criar evento: ', error)
        return res.status(500).json( {error: 'Erro interno do servidor'})
    }
}

export const atualizarEvento = async (req, res) => {
    try {
        const userId = req.userId
        const { id } = req.params
        const { titulo, data, hora, categoriaEventoId } = req.body

        const atualizandoEvento = await Evento.findOne({ where: { id, userId } })

        if (!atualizandoEvento) {
            return res.status(404).json({ error: 'Evento não encontrado' })
        }

        atualizandoEvento.titulo = titulo
        atualizandoEvento.data = data
        atualizandoEvento.hora = hora
        atualizandoEvento.categoriaEventoId = categoriaEventoId

        await atualizandoEvento.save()

        return res.status(200).json({ message: 'Evento atualizado com sucesso' })
    } catch (error) {
        console.error('Erro ao atualizar evento: ', error)
        return res.status(500).json( {error: 'Erro interno do servidor'})
    }
}

export const deletarEvento = async (req, res) => {
    try {
        const userId = req.userId
        const { id } = req.params

        const deletandoEvento = await Task.findOne({ where: { id, userId } })

        if (!deletandoEvento) {
            return res.status(404).json({ error: 'Evento não encontrado' })
        }

        await deletandoEvento.destroy()

        return res.status(200).json({ message: 'Evento deletado com sucesso' })
    } catch (error) {
        console.error('Erro ao deletar evento: ', error)
        return res.status(500).json( {error: 'Erro interno do servidor'})
    }
}
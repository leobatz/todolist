import { CategoriaEvento } from '../models/Index.js'

export const listarCategorias = async (req, res) => {
    try {
        const userId = req.userId

        const categorias = await CategoriaEvento.findAll({ where: { userId } })

        return res.status(200).json(categorias)
    } catch (error) {
        console.error('Erro ao listar categorias: ', error)
        return res.status(500).json( {error: 'Erro interno do servidor'})
    }
}

export const criarCategoria = async (req, res) => {
    try {
        const userId = req.userId
        const { nome, cor } = req.body

        const novaCategoria = await CategoriaEvento.create({ nome, cor, userId })

        return res.status(201).json({ message: 'Categoria criada com sucesso', novaCategoria })
    } catch (error) {
        console.error('Erro ao criar categoria: ', error)
        return res.status(500).json( {error: 'Erro interno do servidor'})
    }
}

export const atualizarCategoria = async (req, res) => {
    try {
        const userId = req.userId
        const { id } = req.params
        const { nome, cor } = req.body

        const atualizandoCategoria = await CategoriaEvento.findOne({ where: { id, userId } })

        if (!atualizandoCategoria) {
            return res.status(404).json({ error: 'Categoria não encontrada.' })
        }

        atualizandoCategoria.nome = nome
        atualizandoCategoria.cor = cor

        await atualizandoCategoria.save()

        return res.status(200).json({ message: 'Categoria atualizada com sucesso' })
    } catch (error) {
        console.error('Erro ao atualizar categoria: ', error)
        return res.status(500).json( {error: 'Erro interno do servidor'})
    }
}

export const deletarCategoria = async (req, res) => {
    try {
        const userId = req.userId
        const { id } = req.params

        const deletandoCategoria = await CategoriaEvento.findOne({ where: { id, userId } })

        if (!deletandoCategoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' })
        }

        await deletandoCategoria.destroy()

        return res.status(200).json({ message: 'Categoria deletada com sucesso' })
    } catch (error) {
        console.error('Erro ao deletar categoria: ', error)
        return res.status(500).json( {error: 'Erro interno do servidor'})
    }
}
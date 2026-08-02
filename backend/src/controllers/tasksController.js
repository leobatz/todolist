import database from '../config/db.js'
import Tasks from '../models/Tasks.js'

export const listarTarefas = async (req, res) => {
    try {
        const tarefas = await Tasks.findAll()

        if (tarefas.length === 0) {
            res.status(404).json({ message: 'Nenhuma tarefa encontrada'})
        }

        res.status(200).json(tarefas)
    } catch (error) {
        console.error('Erro ao listar tarefas: ', error)
        res.status(500).json( {error: 'Erro interno do servidor'})
    }
}

export const criarTarefa = async (req, res) => {
    try {
        const { description } = req.body

        const novaTarefa = await Tasks.create({ description })

        res.status(201).json({ message: 'Tarefa criada com sucesso' })
    } catch (error) {
        console.error('Erro ao criar tarefa: ', error)
        res.status(500).json( {error: 'Erro interno do servidor'})
    }
}

export const atualizarTarefa = async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body

        const atualizandoTarefa = await Tasks.findByPk(id)

        if (!atualizandoTarefa) {
            return res.status(404).json({ error: 'Tarefa não encontrada' })
        }

        atualizandoTarefa.description = description
        await atualizandoTarefa.save()

        res.status(200).json({ message: 'Tarefa atualizada com sucesso' })
    } catch (error) {
        console.error('Erro ao atualizar tarefa: ', error)
        res.status(500).json( {error: 'Erro interno do servidor'})
    }
}

export const deletarTarefa = async (req, res) => {
    try {
        const { id } = req.params

        const deletandoTarefa = await Tasks.findByPk(id)

        if (!deletandoTarefa) {
            return res.status(404).json({ error: 'Tarefa não encontrada' })
        }

        await deletandoTarefa.destroy()

        res.status(200).json({ message: 'Tarefa deletada com sucesso' })
    } catch (error) {
        console.error('Erro ao deletar tarefa: ', error)
        res.status(500).json( {error: 'Erro interno do servidor'})
    }
}
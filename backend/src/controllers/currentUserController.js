import { Usuario } from '../models/Index.js'

export async function usuarioAtual(req, res) {
    try {
        const userId = req.userId

        const usuarioAtual = await Usuario.findByPk(userId)

        if (!usuarioAtual) {
            return res.status(404).json({ message: "Não encontrado" })
        }

        res.status(200).json({ message: "Encontrado", username: usuarioAtual.name})
    } catch (error) {
        console.error('Erro ao buscar informações: ', error)
        return res.status(500).json( { message: 'Erro interno do servidor', error })
    }
}
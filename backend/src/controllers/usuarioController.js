import { Usuario } from '../models/Index.js'
import bcrypt from "bcrypt"

//FUNÇÃO DE LISTAR USUARIOS
export async function listarUsuarios(req, res) {
    try {
        const usuarios = await Usuario.findAll()
        return res.status(200).json(usuarios)
    } catch (error) {
        console.error('Erro ao listar usuarios: ', error)
        return res.status(500).json( {error: 'Erro interno do servidor'})
    }
}

//FUNÇÃO DE CRIAR UM USUARIO
export async function criarUsuario(req, res) {
    try {
        const { nome, email, senha } = req.body

        const senhaHash = await bcrypt.hash(senha, 10)

        const novoUsuario = await Usuario.create({ nome, email, senha: senhaHash })

        return res.status(201).json({ message: "Usuario criado com sucesso!", novoUsuario})
    } catch (error) {
        console.error('Erro ao criar usuario: ', error)
        return res.status(500).json( {error: 'Erro interno do servidor'})
    }
}

//FUNÇÃO DE ATUALIZAR ALGUM USUARIO
export async function atualizarUsuario(req, res) {
    try {
        const { id } = req.params
        const { email } = req.body

        const atualizandoUsuario = await Usuario.findByPk(id)

        if (!atualizandoUsuario) {
            return res.status(404).json({ error: 'Usuario não encontrado' })
        }

        atualizandoUsuario.email = email
        await atualizandoUsuario.save()

        return res.status(200).json({ message: 'Usuario atualizado com sucesso', atualizandoUsuario })
    } catch (error) {
        console.error('Erro ao atualizar usuario: ', error)
        return res.status(500).json( {error: 'Erro interno do servidor'})
    }
}

//FUNÇÃO DE DELETAR ALGUM USUARIO
export async function deletarUsuario(req, res) {
    try {
        const { id } = req.params

        const deletandoUsuario = await Usuario.findByPk(id)

        if (!deletandoUsuario) {
            return res.status(404).json({ error: 'Usuario não encontrado' })
        }

        await deletandoUsuario.destroy()

        return res.status(200).json({ message: 'Usuario deletado com sucesso!', deletandoUsuario })
    } catch (error) {
        console.error('Erro ao deletar usuario: ', error)
        return res.status(500).json( {error: 'Erro interno do servidor'})
    }
}
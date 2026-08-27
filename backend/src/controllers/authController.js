import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { Usuario } from '../models/Index.js'

dotenv.config()

export async function registrar(req, res) {
    try {
        const { nome, email, senha } = req.body

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: "Nome, email e senha são obrigatórios!" })
        }

        const usuarioExistente = await Usuario.findOne(email)

        if (usuarioExistente) {
            return res.status(409).json({ message: "Usuário já existe." })
        }

        const senhaHash = await bcrypt.hash(senha, 10)

        const novoUsuario = await Usuario.create({ name: nome, email, password: senhaHash })

        const token = jwt.sign({ id: novoUsuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(201).json({ 
            message: "Usuario criado com sucesso!", 
            token, 
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.name,
                email: novoUsuario.email
            } 
        })
    } catch (error) {
        console.error('Erro ao registrar usuario: ', error)
        return res.status(500).json( { message: 'Erro interno do servidor', error })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email e senha são obrigatórios" })
        }

        const user = await Usuario.findOne({ where: {email} })

        if (!user) {
            return res.status(401).json({ message: "Email ou senha inválidos" })
        }

        const senhaCorreta = await bcrypt.compare(password, user.password)

        if (!senhaCorreta) {
            return res.status(401).json({ message: "Email ou senha inválidos" })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login realizado com sucesso.", token });

        res.redirect("http://localhost:3000/tarefas");

    } catch (error) {
        console.error('Erro ao fazer login: ', error)
        return res.status(500).json( { message: 'Erro interno do servidor', error })
    }
}
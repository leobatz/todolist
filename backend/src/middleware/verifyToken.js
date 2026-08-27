import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default function(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.usuarioId = decoded.id

        next()
    } catch (error) {
        return res.status(401).json({ message: "Token inválido ou expirado" })
    }
}
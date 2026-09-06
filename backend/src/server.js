import express from 'express'
import database from './config/db.js'
import cors from 'cors'
import verifyToken from './middleware/verifyToken.js'
import tasksRoutes from './routes/tasksRoutes.js'
import loginRoutes from './routes/loginRoutes.js'
import currentUserRoutes from './routes/currentUserRoutes.js'

const app = express()
const PORT = 3000

//middlewares
app.use(express.json())
app.use(cors())

app.use('/tarefas', verifyToken, tasksRoutes)
app.use('/me', verifyToken, currentUserRoutes)
app.use('/auth', loginRoutes)

async function startServer() { //Função para iniciar o server
    try {
        await database.authenticate()
        console.log('Banco de dados conectado com sucesso ✅')

        await database.sync({ alter: true }) //Sincroniza as tabelas com base no que tem na models

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT} 🚀`)
        })
    } catch (error) {
        console.error('Erro ao conectar ao Banco de dados: ', error)
    }
}

startServer()
import express from 'express'
import database from './config/db.js'
import tasksRoutes from './routes/tasksRoutes.js'
import cors from 'cors'

const app = express()
const PORT = 3000

//middlewares
app.use(express.json())
app.use(cors())

app.use('/tarefas', tasksRoutes)
app.use('/login', loginRoutes)

async function startServer() { //Função para iniciar o server
    try {
        await database.authenticate()
        console.log('Banco de dados conectado com sucesso ✅')

        await database.sync() //Sincroniza as tabelas com base no que tem na models

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT} 🚀`)
        })
    } catch (error) {
        console.error('Erro ao conectar ao Banco de dados: ', error)
    }
}

startServer()
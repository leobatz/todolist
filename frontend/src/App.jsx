import { useEffect, useState } from 'react'
import api from './services/api'
import { SquarePen, Trash2 } from 'lucide-react';
import './App.css'

function App() {
  const [tasks, setTask] = useState([])
  const [description, setDescription] = useState("")

  async function getTasks() {
      try {
        const response = await api.get('/tarefas')
        setTask(response.data)
      } catch (error) {
        console.error(error)
      }
    }

  useEffect(() => {
    getTasks()
  }, [])

  async function createTask(event) {
    try {
      event.preventDefault()

      setDescription(description.trim())

      const response = await api.post('/tarefas', {
        description //Posso usar apenas dessa forma pois o nome da variável é o mesmo que o da propriedade em json
      })

      getTasks()
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteTask(id) {
    try {
      const response = await api.delete(`/tarefas/${id}`)
      getTasks()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex items-center justify-center bg-amber-100 h-screen'>
      <div className='w-xl h-screen flex flex-col gap-[20px]'>
        <div className='flex flex-col items-center box-border w-full gap-[20px] mt-[20px]'> 
          <h1 className='font-normal text-[50px] font-bitcount'>Lista de Tarefas</h1>
          <form onSubmit={createTask} className='flex gap-[10px] w-full'>
            <input 
              className='border rounded-sm w-full outline-none pl-[10px]' type="text" placeholder='Fazer compras no mercado...'
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <button type='submit' className='bg-blue-400 active:scale-95 hover:bg-[#4d8bb8] transition-colors text-white font-[poppins] p-[6px] rounded-sm cursor-pointer'>Adicionar</button>
          </form> 
        </div>
        <div>
          {tasks.map(task => (
            <div className='bg-transparent cursor-pointer mb-[3px] hover:bg-[#ccbd8f] transition-colors flex justify-between items-center box-border w-full border rounded-sm h-[4rem] p-[15px]' key={task.id}>
              <h2>{task.description}</h2>
              <div className='flex gap-[10px]'>
                  <SquarePen  className='hover:text-blue-400 transition-colors'/>
                  <Trash2 className='hover:text-red-500' onClick={() => {deleteTask(task.id)}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import api from './services/api'
import './App.css'

function App() {
  const [tasks, setTask] = useState([])

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await api.get('/tarefas')
        setTask(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    getTasks()
  }, [])

  return (
    <div className='flex items-center justify-center bg-amber-100 h-screen'>
      <div className='w-xl h-screen flex justify-between mt-[20px]'>
        <div className='flex flex-col items-center box-border w-full gap-[20px]'> 
          <h1 className='font-normal text-[50px] font-bitcount'>Lista de Tarefas</h1>
          <div className='flex gap-[10px]'>
            <input className='border rounded-sm  w-[300px] outline-none pl-[10px]' type="text" placeholder='Fazer compras no mercado...' />
            <button className='bg-[#039dfc] text-white font-[poppins] p-[6px] rounded-sm cursor-pointer'>Adicionar</button>
          </div> 
        </div>
        {tasks.map(task => (
          <div className='bg-white' key={task.id}>
            <h2>{task.description}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import api from './services/api'
import { SquarePen, Trash2 } from 'lucide-react';
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
      <div className='w-xl h-screen flex flex-col gap-[20px]'>
        <div className='flex flex-col items-center box-border w-full gap-[20px] mt-[20px]'> 
          <h1 className='font-normal text-[50px] font-bitcount'>Lista de Tarefas</h1>
          <div className='flex gap-[10px] w-full'>
            <input className='border rounded-sm w-full outline-none pl-[10px]' type="text" placeholder='Fazer compras no mercado...' />
            <button className='bg-blue-400 text-white font-[poppins] p-[6px] rounded-sm cursor-pointer'>Adicionar</button>
          </div> 
        </div>
        {tasks.map(task => (
          <div className='bg-transparent hover:bg-[#ccbd8f] flex justify-between items-center box-border w-full border rounded-sm h-[4rem] p-[15px]' key={task.id}>
            <h2>{task.description}</h2>
            <div className='flex gap-[10px]'>
              <a href="#">
                <SquarePen  className='hover:text-blue-400 transition-colors'/>
              </a>
              <a href="#">
                <Trash2  className='hover:text-red-500'/>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

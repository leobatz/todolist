import { useEffect, useState, useRef } from 'react'
import api from '../services/Api'
import { SquarePen, Trash2 } from 'lucide-react';

function ToDoList() {
  const [tasks, setTasks] = useState([])
  const [description, setDescription] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editDescription, setEditDescription] = useState("")

  const inputEditRef = useRef(null)

  function startEdit(task) {
    setEditingId(task.id)
    setEditDescription(task.description)

    setTimeout(() => {
      inputEditRef.current.focus()
    }, 0)
  }

  async function getTasks() {
      try {
        const response = await api.get('/tarefas')
        setTasks(response.data)
      } catch (error) {
        console.error(error)
      }
    }

  useEffect(() => {
    getTasks()
  }, [])

  async function createTask(event) {
    try {
      event.preventDefault() //Como estou usando um forms ele previne de recarregar a página

      const text = description.trim()

      await api.post('/tarefas', {
        description: text //Posso usar apenas dessa forma pois o nome da variável é o mesmo que o da propriedade em json
      })

      setDescription("")
      getTasks()

    } catch (error) {
      console.log(error)
    }
  }

  async function deleteTask(id) {
    try {
      await api.delete(`/tarefas/${id}`)
      getTasks()
    } catch (error) {
      console.log(error)
    }
  }

  async function updateTask(id) {
    try {
      await api.put(`/tarefas/${id}`, {
        description: editDescription
      })

      setEditingId(null)
      setEditDescription("")

      await getTasks()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex items-center justify-center bg-amber-100 h-screen'>
      <div className='w-xl h-screen flex flex-col gap-[20px]'>
        <div className='flex flex-col items-center box-border w-full gap-[20px] mt-[50px]'> 
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
              {
                editingId === task.id ? (
                  <input
                    ref={inputEditRef}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="outline-none"
                  />
                ) : (
                  <h2>{task.description}</h2>
                )
              }
              <div className='flex items-center gap-[10px]'>
                  {
                    editingId === task.id ? (
                      <button 
                        className='bg-blue-400 active:scale-95 hover:bg-[#4d8bb8] transition-colors text-white font-[poppins] p-[6px] rounded-sm cursor-pointer' 
                        onClick={() => updateTask(task.id)}
                      >
                        Salvar
                      </button>
                    ) : (
                      <SquarePen  className='hover:text-blue-400 transition-colors' onClick={() => {startEdit(task)}}/>
                    )
                  }
                  <Trash2 className='hover:text-red-500' onClick={() => {deleteTask(task.id)}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ToDoList;

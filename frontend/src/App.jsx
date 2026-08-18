import { useEffect, useState, useRef } from 'react'
import './App.css'
import ToDoList from './components/ToDoList'
import Sidebar from './components/Sidebar'

function App() {
  
  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1'>
        <ToDoList />
      </main>
    </div>
  )
}

export default App

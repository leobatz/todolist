import { useState } from 'react'
import api from './services/api'
import './App.css'

function App() {
  async function getTasks () {
    await api.get('/tasks')
  }

  return (
    <div></div>
  )
}

export default App

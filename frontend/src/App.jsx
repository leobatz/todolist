import './App.css'
import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route } from "react-router"
import Tasks from './pages/Tasks'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>

        {/* Rota da página de Login */}
        <Route path="/login" element={<Login />} />

        {/* Páginas com a Sidebar */}
        <Route element={<Layout />}>

          <Route path="/" element={<Dashboard />} />
          <Route path="/tarefas" element={<Tasks />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/financeiro" element={<Finance />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

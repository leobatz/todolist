import './App.css'
import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route } from "react-router"
import Layout from './layouts/Layout'
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

          <Route path="/" element={<Tasks />} />
          <Route path="/tarefas" element={<Tasks />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router"
import Layout from './layouts/Layout'
import Tasks from './pages/Tasks'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Agenda from './pages/Agenda'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>

        {/* Rota da página de Login */}
        <Route path="/auth" element={<Login />} />

        {/* Páginas com a Sidebar */}
        <Route element={<Layout />}>

          <Route path="/" element={<Tasks />} />
          <Route path="/listadetarefas" element={<Tasks />} />
          <Route path="/agenda" element={<Agenda />} />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import SuccessAlert from "./Alerts/SuccessAlert";
import ErrorAlert from "./Alerts/ErrorAlert";
import api from "../services/api"
import WarningAlert from "./Alerts/WarningAlert";

function LoginCard({ setIsRegister }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visivel, setVisivel] = useState(false)
    const [mensagemAlert, setMensagemAlert] = useState("")
    const [alertType, setAlertType] = useState("")

    const navigate = useNavigate()

    function esperar(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    }

    async function handleSubmit() {
        try {
            const response = await api.post("/auth/login", { email: email, password: password})
            setEmail("")
            setPassword("")

            setMensagemAlert(response.data.message)
            setAlertType("success")
            
            setTimeout(() => {
                setVisivel(true)
            }, 200)

            esperar(2000)

            navigate("/tarefas")
        } catch (error) {
            console.log(error)
            
            if (error.response.status === 400 || error.response.status === 401) {
                setMensagemAlert(error.response.data.message)
                setAlertType("credencials")
                setTimeout(() => {
                    setVisivel(true)
                }, 200)
            } else if (error.response.status === 500) {
                setMensagemAlert(error.response.data.message)
                setAlertType("server")

                setTimeout(() => {
                    setVisivel(true)
                }, 500)
            }

        }
    }

    return (
        <div className="flex flex-col h-[400px] w-[400px] bg-white/15 backdrop-blur-md border-white/30 shadow-xl rounded-2xl p-[30px] gap-[20px]">
            <div className="flex gap-[10px] justify-center items-baseline">
                <h1 className="font-google font-bold text-[25px]">Login</h1>
                <h2 className="font-google text-gray-400">Sign up</h2>
            </div>
            <div className="flex flex-col gap-[15px]">
                <input 
                    className="h-[40px] bg-white rounded-[10px] pl-[15px] outline-none" 
                    type="text" 
                    placeholder="Email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    className="h-[40px] bg-white rounded-[10px] pl-[15px] outline-none" 
                    type="password" 
                    placeholder="Password"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <a href="#" className="self-start font-google text-[15px] text-gray-400 hover:text-gray-500 transition underline">Esqueceu a senha?</a>
            </div>
            <div className="flex flex-col gap-[5px]">
                <button onClick={handleSubmit} className="bg-green-400 h-[40px] text-white font-google text-[15px] rounded-[10px] cursor-pointer active:scale-95 hover:bg-green-600 transition">Login</button>
                <div className="flex gap-[5px] items-baseline justify-center">
                    <p className="self-start font-google text-[15px] text-gray-400">É novo por aqui?</p>
                    <a onClick={() => setIsRegister(true)} className="font-google text-[15px] text-blue-400 hover:text-blue-700 transition underline cursor-pointer">Registre-se</a>
                </div>
            </div>
            {alertType === 'success' && (<SuccessAlert message={mensagemAlert} animacao={`alert ${visivel ? 'show' : ''}`}/>)}
            {alertType === 'credencials' && (<ErrorAlert message={mensagemAlert} animacao={`alert ${visivel ? 'show' : ''}`}/>)}
            {alertType === 'server' && (<WarningAlert message={mensagemAlert} animacao={`alert ${visivel ? 'show' : ''}`}/>)}
        </div>
    )
}

export default LoginCard
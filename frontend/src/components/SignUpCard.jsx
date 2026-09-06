import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from "lucide-react";
import SuccessAlert from "./Alerts/SuccessAlert";
import ErrorAlert from "./Alerts/ErrorAlert";
import WarningAlert from "./Alerts/WarningAlert";
import api from "../services/Api"

function SignUpCard({ setIsRegister }) {
    const [name, setName] = useState("")
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

    async function handleRegister() {
        try {
            const response = await api.post("/auth/register", { nome: name, email: email, senha: password })

            localStorage.setItem("token", response.data.token)

            console.log(response)

            setName("")
            setEmail("")
            setPassword("")
            
            setMensagemAlert(response.data.message)
            setAlertType("success")
            
            setTimeout(() => {
                setVisivel(true)
            }, 200)

            await esperar(2000)

            navigate("/tarefas")
        } catch (error) {
            console.log(error)

            if (error.response.status === 400 || error.response.status === 409) {
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
        <div className="flex flex-col w-[400px] bg-white/15 backdrop-blur-md border-white/30 shadow-xl rounded-2xl p-[30px] gap-[20px] justify-between">
            <div className="flex flex-col gap-[20px]">
                <div className="flex gap-[10px] justify-center items-baseline">
                    <h1 className="font-google font-bold text-[25px]">Sign up</h1>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <input 
                        className="h-[40px] bg-white rounded-[10px] pl-[15px] outline-none" 
                        type="text" 
                        placeholder="Username"
                        id="username"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
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
                </div>
                <div className="flex flex-col gap-[5px]">
                    <button onClick={handleRegister} className="bg-green-400 h-[40px] text-white font-google text-[15px] rounded-[10px] cursor-pointer active:scale-95 hover:bg-green-600 transition">Sign Up</button>
                </div>
            </div>
            <div>
                <button onClick={() => setIsRegister(false)} className="flex gap-2 items-center border pr-[5px] pl-[5px] cursor-pointer rounded-[10px] hover:bg-[#dbd1a9] transition">
                    <ArrowLeft size={20}/>
                    Voltar
                </button>
            </div>
            {alertType === 'success' && (<SuccessAlert message={mensagemAlert} animacao={`alert ${visivel ? 'show' : ''}`}/>)}
            {alertType === 'credencials' && (<ErrorAlert message={mensagemAlert} animacao={`alert ${visivel ? 'show' : ''}`}/>)}
            {alertType === 'server' && (<WarningAlert message={mensagemAlert} animacao={`alert ${visivel ? 'show' : ''}`}/>)}
        </div>
    )
}

export default SignUpCard
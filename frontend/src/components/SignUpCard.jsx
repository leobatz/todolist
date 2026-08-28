import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import api from "../services/api"

function SignUpCard({ setIsRegister }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    async function handleRegister() {
        try {
            await api.post("/auth/register", { name: name, email: email, password: password})
            setName("")
            setEmail("")
            setPassword("")
            navigate("/tarefas")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col h-[400px] w-[400px] bg-white/15 backdrop-blur-md border-white/30 shadow-xl rounded-2xl p-[30px] gap-[20px]">
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
    )
}

export default SignUpCard
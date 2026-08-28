import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import api from "../services/api"
import LoginCard from "../components/LoginCard";
import SignUpCard from "../components/SignUpCard";

function Login() {
    const [isRegister, setIsRegister] = useState(false)

    function AnimatedBackground() {
        return (
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 1000 600"
                preserveAspectRatio="none"
            >
                <path
                    className="snake"
                    d="M-100 200 C 100 50, 50 600, 500 300 S750 50, 1100 300"
                    fill="none"
                    stroke="black"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
            </svg>
        )
    }

    return (
        <main className="bg-amber-100 h-screen w-full flex items-center justify-center gap-[10px]">
            <AnimatedBackground />
            <img className="w-[170px] absolute top-1 m-[10px]" src="/lifehub-logo.svg" alt="Logo" />
            <div className="h-[400px] w-[500px] box-border flex flex-col items-center">
                <h1 className="font-google font-bold text-[50px]">
                    Seja bem-vindo ao LifeHub
                </h1>
                <p className="font-google text-xl pr-[20px]">
                    Faça login, e comece a administrar sua vida e rotina em um só lugar! Certifique-se de que suas credencias estejam corretas.
                </p>
            </div>
            {isRegister ? (
                <SignUpCard setIsRegister={setIsRegister}/>
            ) : (
                <LoginCard setIsRegister={setIsRegister}/>
            )}
        </main>
    )
}

export default Login;
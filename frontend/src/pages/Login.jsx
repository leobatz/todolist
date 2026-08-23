function Login() {
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
            <div className="flex flex-col h-[400px] w-[400px] bg-white/15 backdrop-blur-md border-white/30 shadow-xl rounded-2xl p-[30px] gap-[20px]">
                <div className="flex gap-[10px] justify-center items-baseline">
                    <h1 className="font-google font-bold text-[25px]">Login</h1>
                    <h2 className="font-google text-gray-400">Sign up</h2>
                </div>
                <div className="flex flex-col gap-[15px]">
                    <input className="h-[40px] bg-white rounded-[10px] pl-[15px] outline-none" type="text" placeholder="Username"/>
                    <input className="h-[40px] bg-white rounded-[10px] pl-[15px] outline-none" type="text" placeholder="Password"/>
                    <a href="#" className="self-start font-google text-[15px] text-gray-400 underline">Esqueceu a senha?</a>
                </div>
                <div className="flex flex-col gap-[5px]">
                    <button className="bg-green-400 h-[40px] text-white font-google text-[15px] rounded-[10px] cursor-pointer active:scale-95 hover:bg-green-600 transition">Login</button>
                    <div className="flex gap-[5px] items-baseline justify-center">
                        <p className="self-start font-google text-[15px] text-gray-400">É novo por aqui?</p>
                        <a href="#" className="font-google text-[15px] text-blue-400 hover:text-blue-700 transition underline">Registre-se</a>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login;
function Login() {
    return (
        <main className="bg-amber-100 h-screen w-full flex items-center justify-center gap-[10px]">
            <img className="w-[170px] absolute top-1 m-[10px]" src="/lifehub-logo.svg" alt="Logo" />
            <div className="h-[400px] w-[500px] box-border flex flex-col items-center">
                <h1 className="font-google font-bold text-[50px] p-0 m-0">
                    Seja bem-vindo ao LifeHub
                </h1>
                <p className="font-google text-xl ">
                    Faça login, e comece a administrar sua vida e rotina em um só lugar! Certifique-se de que suas credencias estejam corretas.
                </p>
            </div>
            <div className="border h-[400px] w-[400px]">
                <h1></h1>
            </div>
        </main>
    )
}

export default Login;
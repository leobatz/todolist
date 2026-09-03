import { useState, useEffect, useRef } from "react"
import { User, Settings, LogOut } from 'lucide-react';

function UserCard() {
    const [abrirMenu, setAbrirMenu] = useState(false)

    const userCardRef = useRef(null)

    const userOptions = [
        {
            name: "Perfil",
            icon: User
        },
        {
            name: "Configurações",
            icon: Settings
        },
        {
            name: "Sair",
            icon: LogOut
        }
    ]

    useEffect(() => {
        function fecharMenu(event) {
            if (userCardRef.current && !userCardRef.current.contains(event.target)) { //O lugar que o usuario clicou está dentro do useRef?
                setAbrirMenu(false)
            }
        }

        document.addEventListener("mousedown", fecharMenu)

        return () => {
            document.removeEventListener("mousedown", fecharMenu) //Limpeza do efeito ao destruir componente
        }
    })

    return (
        <div className="relative">
            <button onClick={() => setAbrirMenu(!abrirMenu)} className="w-full h-[50px] mb-[10px] flex items-center gap-3 hover:bg-[#dbd1a9] p-[5px] rounded-[10px] transition cursor-pointer">
                <div className="bg-amber-600 flex items-center h-[40px] w-[40px] justify-center rounded-full p-[5px]">
                    <p>OB</p>
                </div>
                <div>
                    <h1>oceanbatz</h1>
                </div>
            </button>

            {abrirMenu && (
                <div ref={userCardRef} className="absolute mb-2 w-full bottom-full bg-amber-100 rounded-lg drop-shadow-xl">
                    {userOptions.map((option) => {
                        const Icon = option.icon

                        return (
                            <button className="flex gap-2 w-full h-[35px] p-3 text-left rounded-lg items-center cursor-pointer hover:bg-[#dbd1a9] transition">
                                <Icon size={20}/>
                                {option.name}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default UserCard
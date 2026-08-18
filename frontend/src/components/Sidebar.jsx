import { ChevronFirst } from "lucide-react";

export default function Sidebar({ children }) {
    const sections = [
        'Lista de Tarefas',
        'Agenda',
        'Calculadora',
        'Financeiro'
    ];
    
    return (
        <aside className="h-screen relative z-10 w-[250px] bg-amber-100 shadow-2xl">
            <nav className="h-full flex flex-col items-center gap-[20px]">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src="../public/lifehub-logo.png" alt="Logo LifeHub" />
                </div>

                <ul>
                    <li>
                        <a href="">Lista de Tarefas</a>
                    </li>
                    <li>
                        <a href="">Agenda</a>
                    </li>
                    <li>
                        <a href="">Calculadora</a>
                    </li>
                    <li>
                        <a href="">Financeiro</a>
                    </li>
                    <li>
                        <a href=""></a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
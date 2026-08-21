
function Sidebar() {
    const sections = [
        'Dashboard',
        'Lista de Tarefas',
        'Agenda',
        'Calculadora',
        'Financeiro'
    ];
    
    return (
        <aside className="h-screen relative z-10 w-[250px] bg-amber-100 shadow-2xl">
            <nav className="h-full flex flex-col items-center gap-[20px]">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src="/lifehub-logo.png" alt="Logo LifeHub" />
                </div>

                <ul className="flex flex-col gap-[10px]">
                    {sections.map((section) => (
                        <li className="flex w-[200px]" key={section}>
                            <a className="flex justify-center items-center border h-[35px] w-full font-poppins hover:scale-102 hover:-rotate-2 transition-transform duration-200" href="">{section}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
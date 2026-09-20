import { useEffect, useState } from "react"
import api from "../services/Api"
import Calendar from "../components/Agenda/Calendar"
import EventList from "../components/Agenda/EventList"
import CategoryModal from "../components/Agenda/CategoryModal"

function Agenda(){
    const [eventos, setEventos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [modalCategoriaAberto, setModalCategoriaAberto] = useState(false)

    async function getEventos() {
        try {
            const response = await api.get("/eventos")

            setEventos(response.data)
        } catch (error) {
            console.error("Erro ao buscar eventos:", error)
        }
    }

    async function getCategorias() {
        try {
            const response = await api.get("/categoriasEvento")

            setCategorias(response.data)
        } catch (error) {
            console.error("Erro ao buscar categorias:", error)
        }
    }

    const eventosComCategoria = eventos.map(evento => {
        const categoria = categorias.find(
            categoria => categoria.id === evento.categoriaEventoId
        )

        return {
            ...evento,
            categoria
        }
    })

    useEffect(() => {
        getEventos()
        getCategorias()
    }, [])

    return (
        <div className="h-screen flex flex-col pt-[20px] px-[20px] pb-[20px] justify-center border bg-amber-100">

            <div className="flex justify-center mb-[10px] items-center">
                <h1 className='font-normal text-[50px] font-bitcount'>Agenda</h1>
            </div>

            <div className="h-full w-full flex justify-center gap-5">

                <div className="h-full w-[70%] border p-[20px]">
                    <Calendar eventos={eventosComCategoria}/>
                </div>

                <div className="flex flex-col w-[30%] gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <button 
                            className="border w-full p-1 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md" 
                            onClick={() => setModalCategoriaAberto(true)}
                        >
                            Criar Evento
                        </button>
                        <button 
                            className="border w-full p-1 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md" 
                            onClick={() => setModalCategoriaAberto(true)}
                        >
                            Criar Categoria
                        </button>
                    </div>
                    <div className="h-full w-full border">
                        <EventList eventos={eventosComCategoria}/>
                    </div>
                </div>

            </div>

            {modalCategoriaAberto && (
                <CategoryModal
                    categorias={categorias}
                    onClose={() => setModalCategoriaAberto(false)}
                    onCategoriaCriada={(novaCategoria) => {
                        setCategorias(prev => [...prev, novaCategoria])
                    }}
                />
            )}

        </div>
    )
}

export default Agenda
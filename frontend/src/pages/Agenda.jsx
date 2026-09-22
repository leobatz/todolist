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
        <div className="h-screen flex flex-col pt-[20px] px-[20px] pb-[20px] justify-center bg-amber-100 overflow-hidden">

            <div className="flex justify-center mb-[10px] items-center shrink-0">
                <h1 className='font-normal text-[50px] font-bitcount'>Agenda</h1>
            </div>

            <div className="flex-1 w-full flex justify-center gap-5 min-h-0">

                <div className="h-full w-[70%] border p-[20px] flex flex-col min-h-0">
                    <Calendar eventos={eventosComCategoria}/>
                </div>

                <div className="flex flex-col w-[30%] gap-2 h-full min-h-0">
                    <div className="flex justify-center items-center gap-2 shrink-0 font-poppins">
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
                    <div className="flex-1 w-full border min-h-0">
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
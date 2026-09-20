import { useState } from "react"
import api from "../../services/Api"

function CategoryModal({ onClose, onCategoriaCriada, categorias }) {
    const [nome, setNome] = useState("")
    const [cor, setCor] = useState("#3b82f6")
    const [editingId, setEditingId] = useState(null)
    const [editNome, setEditNome] = useState("")
    const [editCor, setEditCor] = useState("#3b82f6")

    function iniciarEdicao(categoria) {
        setEditingId(categoria.id)
        setEditNome(categoria.nome)
        setEditCor(categoria.cor)
    }

    async function atualizarCategoria() {
        try {
            const response = await api.put(`/categoriasEvento/${editingId}`, {
                nome: editNome,
                cor: editCor
            })

            // atualizar estado local

        } catch (error) {
            console.error("Erro ao atualizar categoria:", error)
        }
    }

    async function deletarCategoria(id) {
        try {
            await api.delete(`/categorias-evento/${id}`)

            // buscar categorias novamente

        } catch (error) {
            console.error("Erro ao deletar categoria:", error)
        }
    }

    async function criarCategoria() {
        try {
            const response = await api.post("/categoriasEvento", {
                nome,
                cor
            })

            onCategoriaCriada(response.data.novaCategoria)

            setNome("")
            setCor("#3b82f6")

            onClose()
        } catch (error) {
            console.error("Erro ao criar categoria:", error)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="flex flex-col justify-center items-center gap-2 bg-amber-100 border p-5">
                <h2>Categorias</h2>

                <div>
                    {categorias.map(categoria => (
                        <div className="flex gap-1 items-center border px-2" key={categoria.id}>
                            <div className="flex items-center justify-between">
                                <div className="w-[15px] h-[15px] rounded-[3px]" style={{backgroundColor: categoria.cor}}></div>
                                <span>{categoria.nome}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => iniciarEdicao(categoria)}>
                                        Editar
                                    </button>

                                    <button onClick={() => deletarCategoria(categoria.id)}>
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <hr />
                
                <div className="flex gap-2">
                    <input
                        className="border"
                        type="text"
                        placeholder="Nome da categoria"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <input
                        type="color"
                        value={cor}
                        onChange={(e) => setCor(e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <button className="flex items-center justify-center p-1 border cursor-pointer" onClick={criarCategoria}>
                        Criar
                    </button>

                    <button className="flex items-center justify-center p-1 border cursor-pointer" onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryModal
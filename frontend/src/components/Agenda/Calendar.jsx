import { useState, useRef, useEffect, useMemo } from "react"
import { ChevronRight, ChevronLeft } from 'lucide-react';

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

function mesmaData(data1, data2) {
    return (
        data1.getDate() === data2.getDate() &&
        data1.getMonth() === data2.getMonth() &&
        data1.getFullYear() === data2.getFullYear()
    )
}

function gerarSemanas(semanasParaTras = 500, semanasParaFrente = 500) {
    const hoje = new Date()
    const dias = []
    
    const start = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
    start.setDate(start.getDate() - start.getDay() - (semanasParaTras * 7))
    
    const totalDays = (semanasParaTras + semanasParaFrente + 1) * 7
    
    let currentDate = new Date(start)
    for (let i = 0; i < totalDays; i++) {
        dias.push({
            data: new Date(currentDate),
            numero: currentDate.getDate(),
            mes: currentDate.getMonth(),
            ano: currentDate.getFullYear(),
            hoje: mesmaData(currentDate, hoje),
            id: `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`
        })
        currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return dias
}

function Calendar({ eventos }) {
    const scrollRef = useRef(null)
    const [mesExibido, setMesExibido] = useState(() => {
        const hoje = new Date()
        return new Date(hoje.getFullYear(), hoje.getMonth(), 1)
    })

    // Gera 10 anos para trás e 10 anos para frente para garantir rolagem sem fim
    const dias = useMemo(() => gerarSemanas(500, 500), [])

    useEffect(() => {
        // Rola para a semana atual quando o componente montar
        if (scrollRef.current) {
            const hojeElement = scrollRef.current.querySelector('[data-hoje="true"]')
            if (hojeElement) {
                hojeElement.scrollIntoView({ behavior: 'auto', block: 'center' })
            }
        }
    }, [])

    function eventosDoDia(data, eventos) {
        return eventos.filter(evento => {
            const [ano, mes, dia] = evento.data.split("-").map(Number)
            return (
                data.getFullYear() === ano &&
                data.getMonth() === mes - 1 &&
                data.getDate() === dia
            )
        })
    }

    function mudarMes(valor) {
        const novoMes = new Date(mesExibido.getFullYear(), mesExibido.getMonth() + valor, 1)
        
        if (scrollRef.current) {
            const targetId = `${novoMes.getFullYear()}-${novoMes.getMonth()}-1`
            const targetElement = scrollRef.current.querySelector(`[data-date="${targetId}"]`)
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }

    function voltarParaHoje() {
        if (scrollRef.current) {
            const hojeElement = scrollRef.current.querySelector('[data-hoje="true"]')
            if (hojeElement) {
                hojeElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }
    }

    const handleScroll = (e) => {
        const container = e.target
        const scrollTop = container.scrollTop

        // Ponto de avaliação levemente abaixo do topo para evitar oscilações ao alinhar
        const evaluationTop = scrollTop + 50

        const children = container.children
        let topRowIndex = -1

        // Encontra qual é a linha de dias (semana) que está no topo do calendário
        for (let i = 0; i < children.length; i += 7) {
            const child = children[i]
            if (child.offsetTop + child.clientHeight > evaluationTop) {
                topRowIndex = i
                break
            }
        }

        if (topRowIndex !== -1) {
            let foundDay1 = null
            
            // Verifica se o Dia 1 de algum mês está exatamente nessa semana do topo
            for (let i = topRowIndex; i < topRowIndex + 7; i++) {
                if (dias[i] && dias[i].numero === 1) {
                    foundDay1 = dias[i]
                    break
                }
            }

            let novoMesObj = null
            if (foundDay1) {
                // Se o Dia 1 apareceu no limite superior, atualizamos para o mês dele
                novoMesObj = new Date(foundDay1.ano, foundDay1.mes, 1)
            } else {
                // Caso contrário, o mês é definido pelo dia do meio daquela semana (quarta-feira)
                const diaMeioSemana = dias[topRowIndex + 3]
                if (diaMeioSemana) {
                    novoMesObj = new Date(diaMeioSemana.ano, diaMeioSemana.mes, 1)
                }
            }

            if (novoMesObj) {
                setMesExibido(prev => {
                    if (prev.getMonth() !== novoMesObj.getMonth() || prev.getFullYear() !== novoMesObj.getFullYear()) {
                        return novoMesObj
                    }
                    return prev
                })
            }
        }
    }

    const nomeMes = new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric"
    }).format(mesExibido)

    const tituloMes = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)

    return (
        <div className="flex flex-col h-full w-full min-h-0 font-poppins">

            <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-2">
                    <button 
                        className="border px-4 py-1 cursor-pointer bg-amber-100 hover:brightness-90 transition-all rounded" 
                        onClick={voltarParaHoje}
                    >
                        Hoje
                    </button>
                </div>

                <div className="flex items-center gap-4 h-full">
                    <button
                        className="cursor-pointer h-full font-bold hover:brightness-90 bg-amber-100 border px-2 rounded"
                        onClick={() => mudarMes(-1)}
                    >
                        <ChevronLeft />
                    </button>

                    <h2 className="text-xl font-semibold min-w-[200px] text-center">{tituloMes}</h2>

                    <button
                        className="cursor-pointer h-full font-bold hover:brightness-90 bg-amber-100 border px-2 rounded"
                        onClick={() => mudarMes(1)}
                    >
                        <ChevronRight />
                    </button>
                </div>

            </div>

            <div className="grid grid-cols-7 mb-2 shrink-0">
                {diasSemana.map(dia => (
                    <div key={dia} className="text-center font-bold text-gray-800 cursor-default select-none">
                        {dia}
                    </div>
                ))}
            </div>

            <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="grid grid-cols-7 gap-1 overflow-y-auto flex-1 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {dias.map((dia) => {
                    const eventosDoDiaAtual = eventosDoDia(dia.data, eventos)
                    const pertenceAoMesExibido = dia.mes === mesExibido.getMonth()

                    return (
                        <div 
                            key={dia.id}
                            data-date={dia.id}
                            data-hoje={dia.hoje}
                            className={`min-h-[100px] border border-black/20 rounded-md p-1.5 flex flex-col items-start overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                                bg-amber-100 transition-opacity duration-300
                                ${pertenceAoMesExibido ? 'opacity-100' : 'opacity-40'}
                                ${dia.hoje ? 'border border-black bg-amber-200' : ''}
                            `}
                        >
                            <span className={`font-semibold text-sm mb-1 px-1 rounded cursor-default select-none`}>
                                {dia.numero}
                            </span>

                            <div className="w-full flex flex-col gap-1">
                                {eventosDoDiaAtual.map(evento => (
                                    <div
                                        key={evento.id}
                                        className="flex items-center gap-1 w-full bg-white/50 border border-black/10 rounded px-1 py-0.5 text-sm"
                                    >
                                        <div
                                            className="w-2 h-2 rounded-full shrink-0"
                                            style={{
                                                backgroundColor: evento.categoria?.cor ?? "#999999"
                                            }}
                                        ></div>

                                        <span className="truncate text-xs">
                                            {evento.titulo}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Calendar
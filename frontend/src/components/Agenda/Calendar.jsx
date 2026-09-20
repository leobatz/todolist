import { useState } from "react"

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

function mesmaData(data1, data2) {
    return (
        data1.getDate() === data2.getDate() &&
        data1.getMonth() === data2.getMonth() &&
        data1.getFullYear() === data2.getFullYear()
    )
}

function gerarDias(dataBase) {
    const ano = dataBase.getFullYear()
    const mes = dataBase.getMonth()

    const primeiroDia = new Date(ano, mes, 1)

    const diaDaSemana = primeiroDia.getDay()

    const hoje = new Date()

    const dias = []

    for (let i = 0; i < 42; i++) {

        const numeroDia = i - diaDaSemana + 1

        const data = new Date(ano, mes, numeroDia)

        dias.push({
            data,
            numero: data.getDate(),
            pertenceAoMes: data.getMonth() === mes,
            hoje: mesmaData(data, hoje)
        })
    }

    return dias
}

function Calendar({ eventos }) {
    const [mesExibido, setMesExibido] = useState(() => {
        const hoje = new Date()

        return new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            1
        )
    })

    const dias = gerarDias(mesExibido)

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
        setMesExibido(
            new Date(
                mesExibido.getFullYear(),
                mesExibido.getMonth() + valor,
                1
            )
        )
    }

    function voltarParaHoje() {
        const hoje = new Date()

        setMesExibido(
            new Date(
                hoje.getFullYear(),
                hoje.getMonth(),
                1
            )
        )
    }

    const nomeMes = new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric"
    }).format(mesExibido)

    const tituloMes = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)

    return (
        <div>

            <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-2">

                    <button onClick={voltarParaHoje}>
                        Hoje
                    </button>

                </div>

                <div className="flex items-center gap-4">

                    <button onClick={() => mudarMes(-1)}>
                        ←
                    </button>

                    <h2>{tituloMes}</h2>

                    <button onClick={() => mudarMes(1)}>
                        →
                    </button>

                </div>

            </div>

            <div className="grid grid-cols-7">
                {diasSemana.map(dia => (
                    <div key={dia}>
                        {dia}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {dias.map(dia => {
                    const eventosDoDiaAtual = eventosDoDia(dia.data, eventos)

                    return (
                        <div>
                            <span>{dia.numero}</span>

                            <div>
                                {eventosDoDiaAtual.map(evento => (
                                    <div
                                        key={evento.id}
                                        className="flex items-center gap-1"
                                    >
                                        <div
                                            className="w-2 h-2 rounded-full shrink-0"
                                            style={{
                                                backgroundColor: evento.categoria?.cor ?? "#999999"
                                            }}
                                        ></div>

                                        <span className="truncate">
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
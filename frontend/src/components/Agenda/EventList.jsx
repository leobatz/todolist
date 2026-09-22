function criarDataEvento(evento) {
    const [ano, mes, dia] = evento.data.split("-").map(Number)

    if (evento.hora) {
        const [hora, minuto] = evento.hora.split(":").map(Number)

        return new Date(ano, mes - 1, dia, hora, minuto)
    }

    return new Date(ano, mes - 1, dia)
}

function ehHoje(dataEvento) {
    const hoje = new Date()

    return (
        dataEvento.getFullYear() === hoje.getFullYear() &&
        dataEvento.getMonth() === hoje.getMonth() &&
        dataEvento.getDate() === hoje.getDate()
    )
}

function ordenarEventos(eventos) {
    const agora = new Date()

    const futuros = []
    const passados = []

    eventos.forEach(evento => {
        const dataEvento = criarDataEvento(evento)

        if (ehHoje(dataEvento) || dataEvento > agora) {
            futuros.push({
                ...evento,
                dataEvento
            })
        } else {
            passados.push({
                ...evento,
                dataEvento
            })
        }
    })

    futuros.sort((a, b) => a.dataEvento - b.dataEvento)

    passados.sort((a, b) => b.dataEvento - a.dataEvento)

    return [...futuros, ...passados]
}

function EventList({ eventos }) {

    const eventosOrdenados = ordenarEventos(eventos)

    return (
        <div className="flex flex-col justify-center items-center font-poppins p-3">
            <h2>Compromissos</h2>

            <div>
                {eventosOrdenados.map(evento => (
                <div
                    key={evento.id}
                    className="..."
                >
                    <div className="flex items-center gap-2">

                        <div
                            className="w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: evento.categoria?.cor ?? "#999999"
                            }}
                        ></div>

                        <span>
                            {evento.categoria?.nome ?? "Sem categoria"}
                        </span>

                    </div>

                    <h3>
                        {evento.titulo}
                    </h3>

                    <p>
                        {evento.data}
                    </p>

                    {evento.hora && (
                        <p>{evento.hora}</p>
                    )}
                </div>
            ))}
            </div>
        </div>
    )
}

export default EventList
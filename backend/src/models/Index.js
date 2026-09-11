import Task from './Task.js'
import Usuario from "./Usuario.js"
import Evento from './Evento.js'
import CategoriaEvento from './CategoriaEvento.js'

//Relacionamento Usuario -> Task | Usuario 1:N Task
Usuario.hasMany(Task, { // Um Usuario pertence e possui muitas Tasks (1:N)
    foreignKey: 'userId',
    onDelete: 'CASCADE' //Se um usuario for excluído, as tarefas dele também podem ser excluídas
})

Task.belongsTo(Usuario, { // Várias Tasks pertencem a um Usuario
    constraint: true,
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

//Relacionamento Usuario -> Evento | Usuario 1:N Evento
Usuario.hasMany(Evento, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

Evento.belongsTo(Usuario, {
    constraint: true,
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

//Relacionamento CategoriaEvento -> Evento | CategoriaEvento 1:N Evento
CategoriaEvento.hasMany(Evento, {
    foreignKey: 'categoriaEventoId',
    onDelete: 'CASCADE'
})

Evento.belongsTo(CategoriaEvento, {
    constraint: true,
    foreignKey: 'categoriaEventoId',
    onDelete: 'CASCADE'
})

export {
    Usuario,
    Task,
    Evento,
    CategoriaEvento
}

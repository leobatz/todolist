import Task from './Task.js'
import Usuario from "./Usuario.js"

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

export {
    Usuario,
    Task
}

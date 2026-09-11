import { DataTypes } from 'sequelize'
import database from '../config/db.js'

const CategoriaEvento = database.define('CategoriaEvento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cor: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default CategoriaEvento


import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IPaciente from '../interfaces/iPaciente';

import usuario from "./usuario";
import historiaclinica from "./historiaclinica";

const paciente = sequelize.define<IPaciente>('Paciente',
    {
        idPaciente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idusuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ocupacion: {type: DataTypes.STRING(50)},
        idhistoriaclinica: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'pacientes'
    }
);

paciente.belongsTo(usuario, {
    foreignKey: 'idusuario',
    as: 'usuario',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

paciente.belongsTo(historiaclinica, {
    foreignKey: 'idhistoriaclinica',
    as: 'historiaclinica',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default paciente;
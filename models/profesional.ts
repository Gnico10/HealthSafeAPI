import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

import IProfesional from '../interfaces/iProfesional';

import usuario from "./usuario";

const profesional = sequelize.define<IProfesional>('Profesional',
    {
        idprofesional: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: DataTypes.TEXT
    },
    {
        tableName: 'profesionales'
    }
);

profesional.belongsTo(usuario, {
    foreignKey: 'idusuario',
    as: 'usuario',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

profesional.belongsTo(profesional, {
    foreignKey: 'iddireccion',
    as: 'direccion',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
});

export default profesional;
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import IPrescripcion from '../interfaces/iPrescripcion';
import IPago from '../interfaces/iPago';

const pago = sequelize.define<IPago>('Pago',
    {
        idpago: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fechahora:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);

export default pago;
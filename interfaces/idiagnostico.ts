import { Model } from "sequelize/types";

interface IDiagnostico extends Model{
    iddiagnostico?: number,
    nombre? : string,
    descripcion? : string
};

export default IDiagnostico;
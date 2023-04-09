import {Request, Response} from 'express';
import { generarJWT } from '../helpers/generarJWT';

import Paciente from '../models/paciente';

import HistoriaClinica from '../models/historiaclinica';
import Usuario from '../models/usuario';
import Rol from '../models/rol';

export const getPacientes = async (req: Request, res: Response) => {
    const pacientes = await Paciente.findAll();
    res.json({pacientes});
}

export const getPaciente = async (req: Request, res: Response) => {
    const { id } = req.params;
    let paciente = await Paciente.findByPk(id);

    if (paciente){
        res.json(paciente);
    } else {
        res.status(404).json({
            msg: `No existe un paciente con id = ${id}`
        });
    }
}

export const postPaciente = async (req: Request, res: Response) => {
    const { idusuario,
            ocupacion} = req.body;

    try {
        // Validaciones
        let existepaciente = await Paciente.findOne({
            where: {
                idusuario: idusuario
            }
        });

        if (existepaciente) {
            return res.status(400).json({
                msg: 'El paciente ya existe'
            });
        }

        let usuario : any = await Usuario.findByPk(idusuario, {
            include: [{
                model: Rol,
                as: 'rol'
            }]        
        });

        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe'
            });
        }
        
        if ( usuario.rol.descripcion != 'Paciente') {
            return res.status(400).json({
                msg: 'El usuario seleccionado no es un Paciente'
            }); 
        }

        // Creación de instancia en la base de datos.
        let historiaclinica = await HistoriaClinica.create({
            peso: 0,
            edad: 0
        });

        // Creación del paciente
        await Paciente.create({
            idusuario,
            ocupacion,
            idhistoriaclinica: historiaclinica.idhistoriaclinica
        });

        let pacienteDB = await Paciente.findOne({
            where: {
                idusuario: idusuario
            },
            include: [
                {
                    model: Usuario,
                    as: 'usuario'
                },
                {
                    model: HistoriaClinica,
                    as: 'historiaclinica'
                }
            ],
        });

        const token = await generarJWT(idusuario);

        res.json({
            msg:'Paciente dado de alta',
            paciente: pacienteDB,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo crear el paciente'
        });
    }
}

export const deletePaciente = async (req: Request, res: Response) => {
    const { idPaciente } = req.params;

    try {
        const paciente = await Paciente.findByPk(idPaciente);
        if (!paciente) {
            return res.status(404).json({
                msg: `No existe un paciente con el ID = ${idPaciente}`
            });
        }

        await paciente.destroy();

        res.json({
            msg: 'El paciente fué eliminado con éxito',
            paciente
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error Interno. No se pudo Eliminar el paciente'
        });
    }
}
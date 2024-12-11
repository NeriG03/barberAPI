import { Cita, User, Barber, Sucursal } from "../src/models/index.models.js";
import { Op } from 'sequelize';

class CitaService {
    constructor(){}

    async create(data) {
        try {
            return await Cita.create(data);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAll(){
        return await Cita.findAll({
            include:
            [
                {
                    model: User
                },
                {
                    model: Barber,
                    include:
                    {
                        model: Sucursal
                    }
                }
            ]
        })
    }

    async getByDateRange(start, end){
        return await Cita.findAll({
            where: {
                fecha: {
                    [Op.between]: [start, end]
                }
            },
            include:
            [
                {
                    model: User
                },
                {
                    model: Barber,
                    include:
                    {
                        model: Sucursal
                    }
                }
            ]
        })
    }

    async getCitasByBarberAndDate(BarberId){
        const today = new Date();
        const start = new Date(today.setHours(0, 0, 0, 0));
        const end = new Date(today.setHours(23, 59, 59, 999));
        return await Cita.findAll({
            where: {
                BarberId
            },
            include:
            [
                {
                    model: User
                },
                {
                    model: Barber,
                    include:
                    {
                        model: Sucursal
                    }
                }
            ]
        })
    }

    async getHorasDisponiblesByBarberAndDate(BarberId, date){
        const dateObj = new Date(date); 
        const start = new Date(dateObj.setHours(0, 0, 0, 0));
        const end = new Date(dateObj.setHours(23, 59, 59, 999));
        const citas = await Cita.findAll({
            where: {
                BarberId,
                fecha: {
                    [Op.between]: [start, end]
                }
            }
        })
        const horas = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00'];
        const horasOcupadas = citas.map(cita => cita.hora);
        return horas.filter(hora => !horasOcupadas.includes(hora));
    }

    async getCitasByUserAndDate(UserId){
        const today = new Date();
        //const start = new Date(today.setHours(0, 0, 0, 0));
        //const end = new Date(today.setHours(23, 59, 59, 999));
        return await Cita.findAll({
            where: {
                UserId
            },
            include:
            [
                {
                    model: User
                },
                {
                    model: Barber,
                    include:
                    {
                        model: Sucursal
                    }
                }
            ]
        })
    }


    async getById(id){
        return await Cita.findByPk(id,
            {
                include:
                [
                    {
                        model: User
                    },
                    {
                        model: Barber,
                        include:
                        {
                            model: Sucursal
                        }
                    }
                ]
            }
        )
    }

    async update(id, cita){
        return await Cita.update(cita, {
            where: {
                id
            }
        })
    }

    async delete(id){
        return await Cita.destroy({
            where: {
                id
            }
        })
    }


}

export default new CitaService();
import { Cita, User, Barber, Sucursal } from "../src/models/index.models.js";
import { Op } from 'sequelize';

class CitaService {
    constructor(){}


    async create (data){
        return await Cita.create(data)
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

    async getCitasByBarberAndDate(barberId){
        const today = new Date();
        const start = new Date(today.setHours(0, 0, 0, 0));
        const end = new Date(today.setHours(23, 59, 59, 999));
        return await Cita.findAll({
            where: {
                barberId,
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
import { Barber, Sucursal } from "../src/models/index.models.js"

class UsuarioService {
    async create(barber){
        return Barber.create(barber);
    }

    async getAll(){
        return Barber.findAll({
            include: {
                model: Sucursal
            }
        });
    }

    async getById(id){
        return Barber.findByPk(id,{
            include: {
                model: Sucursal
            }
        });
    }

    async getByEmail(email){
        return Barber.findOne({
            where: {
                email
            }
        });
    }

    async getByPhone(phone){
        return Barber.findOne({
            where: {
                phone
            }
        });
    }

    async getBySucursal(sucursalId){
        return Barber.findAll({
            where: {
                sucursalId
            }
        });
    }

    async update(id, barber){
        return Barber.update(barber, {
            where: {
                id
            }
        });
    }

    async delete(id){
        return Barber.destroy({
            where: {
                id
            }
        });
    }
}

export default new UsuarioService();
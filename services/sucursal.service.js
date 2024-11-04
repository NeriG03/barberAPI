import { Sucursal } from "../src/models/index.models.js";

class SucursalService {
    constructor(){}

    async getAll(){
        return await Sucursal.findAll();
    }

    async getById(id){
        return await Sucursal.findByPk(id);
    }

    async create(sucursal){
        return await Sucursal.create(sucursal);
    }

    async update(id, sucursal){
        return await Sucursal.update(sucursal, {
            where: {
                id
            }
        });
    }

    async delete(id){
        return await Sucursal.destroy({
            where: {
                id
            }
        });
    }
}

export default new SucursalService();
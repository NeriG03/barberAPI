import { Barber } from "../src/models/index.models.js"

class UsuarioService {
    async create(barber){
        return Barber.create(barber);
    }

    async getAll(){
        return Barber.findAll();
    }

    async getById(id){
        return Barber.findByPk(id);
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
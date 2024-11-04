import { User } from "../src/models/index.models.js";

class UserService {
    constructor() {}

    async create(user) {
        return await User.create(user);
    }

    async getAll() {
        return await User.findAll();
    }

    async getById(id) {
        return await User.findByPk(id);
    }

    async update(id, user) {
        return await User.update(user, {
            where: {
                id
            }
        });
    }

    async delete(id) {
        return await User.destroy({
            where: {
                id
            }
        });
    }

    async getByEmail(email) {
        return await User.findOne({
            where: {
                email
            }
        });
    }

}

export default new UserService();
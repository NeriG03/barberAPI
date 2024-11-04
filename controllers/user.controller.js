import userService from "../services/user.service.js";

const post = async (req, res) => {
    try {
        const user = await userService.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const get = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getById = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const put = async (req, res) => {
    try {
        const user = await userService.update(req.params.id, req.body);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const remove = async (req, res) => {
    try {
        await userService.delete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default { post, get, getById, put, remove };
import BarberService from "../services/barber.service.js";

const post = async (req, res) => {
    try {
        const barber = req.body;
        const response = await BarberService.create(barber);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const get = async (req, res) => {
    try {
        const response = await BarberService.getAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


const getById = async (req, res) => {
    try {
        const response = await BarberService.getById(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const put = async (req, res) => {
    try {
        const response = await BarberService.update(req.params.id, req.body);
        res.status(204).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const remove = async (req, res) => {
    try {
        const response = await BarberService.delete(req.params.id);
        res.status(204).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export default { post, get, getById, put, remove };
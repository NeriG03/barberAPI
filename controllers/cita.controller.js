import CitaService from "../services/cita.service.js"

const post = async (req, res) => {
    try {
        const cita = await CitaService.create(req.body);
        res.status(201).json(cita);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getByDate = async (req, res) => {
    try {
        const today = new Date();
        const start = new Date(today.setHours(0, 0, 0, 0));
        const end = new Date(today.setHours(23, 59, 59, 999));
        const citas = await CitaService.getByDateRange(start, end);
        res.status(200).json(citas);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getByBarberAndDate = async (req, res) => {
    try {
        const citas = await CitaService.getCitasByBarberAndDate(req.params.barberId);
        res.status(200).json(citas);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const get = async (req, res) => {
    try {
        const citas = await CitaService.getAll();
        res.status(200).json(citas);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getById = async (req, res) => {
    try {
        const cita = await CitaService.getById(req.params.id);
        res.status(200).json(cita);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const put = async (req, res) => {
    try {
        await CitaService.update(req.params.id, req.body);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const remove = async (req, res) => {
    try {
        await CitaService.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export default {
    post,
    get,
    getById,
    put,
    remove,
    getByDate,
    getByBarberAndDate
}
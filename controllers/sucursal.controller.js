import CasaService from '../services/sucursal.service.js';

const post = async (req, res) => {
    try {
        const sucursal = await CasaService.create(req.body);
        res.status(201).json(sucursal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const get = async (req, res) => {
    try {
        const sucursales = await CasaService.getAll();
        res.status(200).json(sucursales);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const sucursal = await CasaService.getById(req.params.id);
        res.status(200).json(sucursal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const put = async (req, res) => {
    try {
        const sucursal = await CasaService.update(req.params.id, req.body);
        res.status(204).json(sucursal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const remove = async (req, res) => {
    try {
        await CasaService.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default { post, get, getById, put, remove };
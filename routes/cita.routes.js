import express from 'express';
import citaController from '../controllers/cita.controller.js';
import { verifyJWT } from '../middlewares/jwt.middleware.js';
const router = express.Router();

router
    .get('/cita', verifyJWT , citaController.get)
    .post('/cita', citaController.post)
    .get('/cita/:id', citaController.getById)
    .put('/cita/:id', citaController.put)
    .delete('/cita/:id', citaController.remove)
    .get('/citaDate', citaController.getByDate)
    .get('/citaBarber/:barberId', citaController.getByBarberAndDate)
    .get('/cita/horas/:barberId/:date', citaController.getHorasDisponibles)
    .get('Id/citaUser/:user', citaController.getByUserAndDate);

export default router;

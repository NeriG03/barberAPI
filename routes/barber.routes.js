import express from 'express';
import BarberController from '../controllers/barber.controller.js';


const router = express.Router();

router
    .get('/barbers', BarberController.get)
    .get('/barbers/:id', BarberController.getById)
    .post('/barbers', BarberController.post)
    .put('/barbers/:id', BarberController.put)
    .delete('/barbers/:id', BarberController.remove);

export default router;
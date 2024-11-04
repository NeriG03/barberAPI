import express from 'express';
import BarberController from '../controllers/barber.controller.js';


const router = express.Router();

router
    .get('/barber', BarberController.get)
    .get('/barber/:id', BarberController.getById)
    .post('/barber', BarberController.post)
    .put('/barber/:id', BarberController.put)
    .delete('/barber/:id', BarberController.remove);

export default router;
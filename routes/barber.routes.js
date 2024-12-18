import express from 'express';
import BarberController from '../controllers/barber.controller.js';
import { verifyJWT } from '../middlewares/jwt.middleware.js';


const router = express.Router();

router
    .get('/barber', BarberController.get)
    .get('/barber/:id', BarberController.getById)
    .post('/barber', BarberController.post)
    .put('/barber/:id', BarberController.put)
    .delete('/barber/:id', BarberController.remove)
    .post('/barberLogin', BarberController.login)
    .get('/barber/sucursal/:sucursal', BarberController.getBarberBySucursal);

export default router;
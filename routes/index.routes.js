import express from 'express';
import barberRouter from './barber.routes.js';
import sucursalRouter from './sucursal.routes.js';
import userRouter from './user.routes.js';
import citaRouter from './cita.routes.js';

export default function routes(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('', barberRouter);
    router.use('', sucursalRouter);
    router.use('', userRouter);
    router.use('', citaRouter);
}
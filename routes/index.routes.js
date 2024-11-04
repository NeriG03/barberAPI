import express from 'express';
import barberRouter from './barber.routes.js';

export default function routes(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('', barberRouter);
    

}
import express from 'express';

export default function routes(app){
    const router = express.Router();
    app.use('/api/v1', router);
    

}
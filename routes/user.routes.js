import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router
    .get('/user', userController.get)
    .post('/user', userController.post)
    .get('/user/:id', userController.getById)
    .put('/user/:id', userController.put)
    .delete('/user/:id', userController.remove);

export default router;
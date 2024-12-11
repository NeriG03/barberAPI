import express from 'express';
import userController from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/jwt.middleware.js';

const router = express.Router();

router
    .get('/user', userController.get)
    .post('/user', userController.post)
    .get('/user/:id',userController.getById)
    .put('/user/:id', userController.put)
    .delete('/user/:id', userController.remove)
    .post('/user/login', userController.login)
    ;

export default router;
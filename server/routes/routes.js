import express, { Router } from 'express';
import { login, signup } from '../controllers/AuthController.js';
import { signupValidation,loginValidation } from '../middlewares/AuthValidation.js';

const route = express.Router();


route.post('/login', loginValidation, login);
route.post('/signup', signupValidation, signup);

export default route;
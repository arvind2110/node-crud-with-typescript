import express, { Request, Response } from 'express';
import LoginController from '../../controllers/auth/LoginController';
import RegistrationController from '../../controllers/auth/RegistrationController';
import RegistrationValidation from './validations/registrationValidation';
import LoginValidation from './validations/loginValidation';

const authRoutes = express.Router();
const { loginValidation } = LoginValidation;
const { registrationValidation } = RegistrationValidation;

authRoutes.post('/login', loginValidation, (req: Request, res: Response) => {
  LoginController.login(req, res);
});

authRoutes.post('/register', registrationValidation, (req: Request, res: Response) => {
  RegistrationController.register(req, res);
});

export default authRoutes;
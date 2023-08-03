import express, { Request, Response } from 'express';
import UserController from '../../controllers/UserController';
import UserIdValidation from './validations/userIdValidation';
import UpdateUserValidation from './validations/updateUserValidation';

const { userIdValidation } = UserIdValidation;
const { updateUserValition } = UpdateUserValidation;

const userRoutes = express.Router();

userRoutes.get('/', (req: Request, res: Response) => {
  UserController.getAllUsers(req, res);
});

userRoutes.get('/:id', userIdValidation, (req: Request, res: Response) => {
  UserController.getUser(req, res);
});

userRoutes.put('/:id', userIdValidation, updateUserValition, (req: Request, res: Response) => {
  UserController.updateUser(req, res);
});

userRoutes.delete('/:id', userIdValidation, (req: Request, res: Response) => {
  UserController.deleteUser(req, res);
});

export default userRoutes;
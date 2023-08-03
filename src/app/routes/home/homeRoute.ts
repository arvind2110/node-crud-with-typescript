import express, { Request, Response } from 'express';
import HomeController from '../../controllers/HomeController';

const homeRoutes = express.Router();

homeRoutes.get('/', (req: Request, res: Response) => {
  HomeController.home(req, res);
});

export default homeRoutes;
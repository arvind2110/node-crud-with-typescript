import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import passport from '../utils/passport';

import i18nextMiddleware from 'i18next-http-middleware';
import i18next from '../locale/i18n';

import authRoutes from './auth/authRoutes';
import userRoutes from './users/userRoutes';
import homeRoutes from './home/homeRoute';

const routes = express.Router();

routes.use(i18nextMiddleware.handle(i18next));

// Parse application/x-www-form-urlencoded
routes.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
routes.use(bodyParser.json());

// Use Helmet!
routes.use(helmet());

// Morgan middleware
userRoutes.use(morgan('combined'));

routes.use('/', homeRoutes);
routes.use('/auth', authRoutes);

routes.use(passport.initialize());
// app.use(passport.authenticate('jwt', { session: false })); /* To apply for all routes mentioned below */

routes.use('/users', passport.authenticate('jwt', { session: false }), userRoutes);

// Handle route not found case
routes.use(function(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ error: 'Requested resouce is not found!!!' });
});

// Global Exception Handling
routes.use(function(error: any, req: Request, res: Response, next: NextFunction) {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error'
    }
  });
});

// Handle uncaught exceptions and unhandled promices
process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  // Perform any necessary cleanup or error handling logic here
  
  // Terminate the application gracefully
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.error('Unhandled Promise Rejection:', reason);
  // Perform any necessary cleanup or error handling logic here
});


export default routes;
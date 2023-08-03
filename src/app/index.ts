import express from 'express';
import routes from './routes/routes';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use('/', routes);

export default app;
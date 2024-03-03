import express, { Application } from 'express';
import cors from 'cors';

import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.get('/test', (req, res) => {
//   throw new Error('Simple ERROR');
// });

app.use(globalErrorHandler);

export default app;

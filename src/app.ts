import express, { Application } from 'express';
import cors from 'cors';

// import ApiError from './errors/ApiError';
import routes from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/', routes);

app.use(globalErrorHandler);

export default app;

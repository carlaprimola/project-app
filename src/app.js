//importamos express
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(morgan('dev')); //simplifica el proceso de registros
app.use(express.json());
app.use(cookieParser());

//añadimos /api antes de la ruta para distinguirlo de las rutas del front
app.use("/api",authRoutes) 
app.use("/api", taskRoutes)

export default app;
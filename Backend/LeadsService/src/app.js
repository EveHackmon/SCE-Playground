// src/app.js
import express from 'express';
import leadsRoutes from './routes/leadsRoutes.js';

const app = express();
app.use(express.json());
app.use('/leads', leadsRoutes);

export default app;

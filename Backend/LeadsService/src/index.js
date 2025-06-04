import express from 'express';

import dotenv from 'dotenv';
import leadsRoutes from './routes/leadsRoutes.js';
import app from './app.js';


dotenv.config();


const PORT = process.env.PORT || 4001;


app.use(express.json());




// Authentication routes
app.use('/', leadsRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Lead Service');
});


app.listen(PORT, () => {
  console.log(`leads service running on port ${PORT}`);
});



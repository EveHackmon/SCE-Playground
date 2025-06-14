// authentication-service/src/index.js
//
import 'dotenv/config';
import express, { json } from 'express';
import Routes from './routes/productsRoutes.js';
import { initDb } from './data-access/productsDataAccess.js';

const app = express();
const PORT = process.env.PORT || 4006;

app.use(json());

// Initialize the database connection
initDb()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
  });

// Authentication routes
app.use('/', Routes);

app.listen(PORT, () => {
  console.log(`Products service running on port ${PORT}`);
});

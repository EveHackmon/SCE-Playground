import express from 'express';
import productRoutes from '../src/routes/productsRoutes.js';
import { initDb } from '../src/data-access/productsDataAccess.js';

export const app = express();
app.use(express.json());

app.use('/', productRoutes);

let server = null;

export async function startTestServer() {
  try {
    await initDb();
    return new Promise((resolve, reject) => {
      server = app.listen(4005, () => {
        console.log('Products service running on port 4005');
        resolve(server);
      });
      server.on('error', (err) => {
        reject(err);
      });
    });
  } catch (dbErr) {
    return Promise.reject(dbErr);
  }
}

// products-service/src/data-access/productsDataAccess.js
import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false,
  define: {
    underscored: true, // created_at, updated_at במקום camelCase
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // חשוב עבור Render למשל
    },
  },
});

export async function initDb() {
  try {
    await sequelize.authenticate();
    console.log('Connected to the products database successfully.');

    // Sync all defined models
    await sequelize.sync({ alter: true }); // אפשר לשנות ל-force או להשאיר ל-dev בלבד
  } catch (err) {
    console.error('Unable to connect to the products database:', err);
    throw err;
  }
}

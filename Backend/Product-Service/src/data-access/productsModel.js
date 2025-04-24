// products-service/src/data-access/productsModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from './productsDataAccess.js';

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  datasheet_url: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'products',
  timestamps: true
});

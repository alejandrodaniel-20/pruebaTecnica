const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  }
);

// Opciones para coincidir con tu esquema en pgAdmin (tablas "User" y "House")
const tableOpts = { freezeTableName: true, underscored: false, timestamps: true };

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(150), unique: true, allowNull: false, validate: { isEmail: true } },
  password: { type: DataTypes.STRING(255), allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { ...tableOpts, tableName: 'User' });

const House = sequelize.define('House', {
  address: { type: DataTypes.STRING(255), allowNull: false },
  price: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  status: { type: DataTypes.STRING(50), defaultValue: 'disponible' },
  sellerId: { type: DataTypes.INTEGER, allowNull: false },
}, { ...tableOpts, tableName: 'House' });

// Relación: Un User tiene muchos Inmuebles [cite: 115, 116]
User.hasMany(House, { foreignKey: 'sellerId' });
House.belongsTo(User, { foreignKey: 'sellerId' });

module.exports = { sequelize, User, House }; // Exportación vital
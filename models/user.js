const { DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const UserModel = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        mileage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0 // 確保初始值為 0
        },
        createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
        },
        updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
        }
    },
    {  
        tableName: 'user',
        timestamps: true,
        sequelize
    }
);

module.exports = UserModel;
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
    },
    {  
        tableName: 'user',
        timestamps: true,
        sequelize
    }
);

module.exports = UserModel;
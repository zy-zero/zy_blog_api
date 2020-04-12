const sequelize = require('../common/db');
const DataTypes = require('sequelize');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    create_ts: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false
    },
    last_ts: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'user'
});
const Blog = require('./blog.model');
User.hasMany(Blog,{sourceKey:'id',foreignKey:'user_id'});
module.exports = User;

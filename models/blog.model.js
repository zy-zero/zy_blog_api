const sequelize = require('../common/db');
const DataTypes = require('sequelize');

const Blog = sequelize.define('blog', {
    id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
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
    tableName: 'blog'
});



module.exports = Blog;

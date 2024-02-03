const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// '../config/database' 是一个包含 Sequelize 实例的配置文件

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
});

User.sync().then(r => {
    console.log("Table: "+r.name+" synced")
})

module.exports = User;

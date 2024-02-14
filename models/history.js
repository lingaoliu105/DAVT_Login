const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// '../config/database' 是一个包含 Sequelize 实例的配置文件

const History = sequelize.define('History', {
    RIC: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    Category: { type: DataTypes.INTEGER, allowNull: false },
});

History.sync().then(r => {
    console.log("Table: "+r.name+" synced")
})

module.exports = History;

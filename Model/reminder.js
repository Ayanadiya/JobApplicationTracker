const sequelize=require('../Util/db');
const Sequelize=require('sequelize');

const Reminder= sequelize.define('reminder', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    reminderDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports=Reminder;
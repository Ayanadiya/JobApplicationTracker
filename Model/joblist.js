const sequelize=require('../Util/db');
const Sequelize=require('sequelize');

const Joblist= sequelize.define('joblists', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    jobtitle:{
        type:Sequelize.STRING,
        allowNull:false
    },
    company:{
        type:Sequelize.STRING,
        allowNull:false
    },
    applylink:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports= Joblist;
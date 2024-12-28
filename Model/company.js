const sequelize=require('../Util/db');
const Sequelize=require('sequelize');

const Company= sequelize.define('company', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    size:{
        type:Sequelize.STRING,
        allowNull:false
    },
    industry:{
        type:Sequelize.STRING,
        allowNull:false
    },
    contact:{
        type:Sequelize.STRING,
        allowNull:false
    },
    notes:{
        type:Sequelize.STRING,
        allowNull:true
    }
});

module.exports=Company;
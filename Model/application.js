const sequelize=require('../Util/db');
const Sequelize=require('sequelize');

const Application= sequelize.define('aplications', {
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
    description: {
            type: Sequelize.STRING,
            allowNull: false
    },
    applydate: {
            type: Sequelize.DATE,
            allowNull: false
    },
    status: {
            type: Sequelize.STRING, 
            allowNull: false
    },
    notes:{
            type:Sequelize.STRING,
            allowNull:true
    },
    resume:{
        type:Sequelize.STRING,
        allowNull:true
    },
    coverletter:{
        type:Sequelize.STRING,
        allowNull:true
    }
})

module.exports=Application;
const sequelize=require('../Util/db');
const Sequelize=require('sequelize');

const Profile= sequelize.define('profile', {
    id:{
            type:Sequelize.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
    role:{
        type:Sequelize.STRING,
        allowNull:true
    },    
    phone:{
            type:Sequelize.STRING,
            allowNull:true
    },
    careerGoals: {
            type: Sequelize.STRING,
            allowNull: true,  // Optional, as career goals may be updated over time
    },
    jobPreference: {
            type: Sequelize.STRING,  // For example: 'Remote', 'On-site', etc.
            allowNull: true,
    },
    locationPreference: {
            type: Sequelize.STRING,  // For example: 'New York', 'Remote', etc.
            allowNull: true,
    },
    address:{
            type:Sequelize.STRING,
            allowNull:true
    }
})

module.exports=Profile;
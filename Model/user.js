const sequelize=require('../Util/db');
const Sequelize=require('sequelize');

const User= sequelize.define('users', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
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
      }
});

module.exports=User;
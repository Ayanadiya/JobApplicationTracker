const { Router } = require('express');
const path=require('path');

exports.openingpage = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'opening.html'));
}

exports.signuppage = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'signup.html'));
}

exports.loginpage = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views' , 'login.html'));
}
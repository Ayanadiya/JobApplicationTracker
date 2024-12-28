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

exports.homepage = (req,res) => {
    res.sendFile(path.join(__dirname, '../', 'Views', 'home.html'));
}

exports.profilepage = (req,res) => {
    res.sendFile(path.join(__dirname, '../', 'Views', 'profile.html'));
}

exports.applicationpage = (req,res) => {
    res.sendFile(path.join(__dirname, '../', 'Views', 'application.html'));
}

exports.companypage = (req,res) => {
    res.sendFile(path.join(__dirname, '../', 'Views', 'company.html'));
}
const express=require('express');

const router=express.Router();

const homeController=require('../Controller/home');

router.get('/', homeController.openingpage );

router.get('/signup', homeController.signuppage);

router.get('/login', homeController.loginpage);

router.get('/home', homeController.homepage);

router.get('/home/profile', homeController.profilepage);

router.get('/home/applications', homeController.applicationpage);

router.get('/home/company', homeController.companypage);

router.get('/home/Joblist', homeController.joblistingpage);

module.exports=router;
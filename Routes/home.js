const express=require('express');

const router=express.Router();

const homeController=require('../Controller/home');

router.get('/', homeController.openingpage );

router.get('/signup', homeController.signuppage);

router.get('/login', homeController.loginpage);

module.exports=router;
const express=require('express');

const router=express.Router();

const userController=require('../Controller/user');

router.post('/signup', userController.postsignup);

router.post('/login', userController.postlogin);

module.exports=router;
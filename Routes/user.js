const express=require('express');

const router=express.Router();

const userController=require('../Controller/user');
const userMiddleware=require('../Middleware/authentication');

router.post('/signup', userController.postsignup);

router.post('/login', userController.postlogin);

router.get('/userdetails', userMiddleware.userAuthenticate, userController.getUserDetails )

module.exports=router;
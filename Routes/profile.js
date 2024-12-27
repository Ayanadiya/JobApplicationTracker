const express=require('express');

const router=express.Router();

const profileController=require('../Controller/profile');
const userMiddleware=require('../Middleware/authentication');

router.post('/updateprofile', userMiddleware.userAuthenticate, profileController.updateprofile);

router.post('/updatepersonalinfo', userMiddleware.userAuthenticate, profileController.updatePersonalInfo);

router.post('/updatecareergoal', userMiddleware.userAuthenticate, profileController.updateCareergoal);


module.exports=router;
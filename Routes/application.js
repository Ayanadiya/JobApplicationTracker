const express=require('express');

const router=express.Router();

const applicationController=require('../Controller/application');
const userMiddleware=require('../Middleware/authentication');
const servicesMiddleware=require('../services/awss3');

router.get('/getapplication', userMiddleware.userAuthenticate, applicationController.getApplication);

router.post('/addapplication', userMiddleware.userAuthenticate, applicationController.addApplication);

router.put('/updateapplication/:applnId', userMiddleware.userAuthenticate, applicationController.updateApplication);

router.post('/uploadfile', servicesMiddleware.uploadfile);

router.get('/getapplicationdetail/:applnId', applicationController.getApplicationdetails);

module.exports=router;
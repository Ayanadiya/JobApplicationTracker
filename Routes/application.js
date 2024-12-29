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

router.post('/setReminder', applicationController.setReminder);

router.get('/getapplicationsummary', userMiddleware.userAuthenticate, applicationController.getapplicationsummary);

router.get('/getsearchapplications', userMiddleware.userAuthenticate, applicationController.getsearchapplication);

module.exports=router;
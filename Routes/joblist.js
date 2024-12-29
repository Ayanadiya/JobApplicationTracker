const express=require('express');

const router=express.Router();

const joblistController=require('../Controller/joblisting');
const userMiddleware=require('../Middleware/authentication');

router.get('/getjobs', userMiddleware.userAuthenticate, joblistController.getJoblists);

router.post('/addjob', userMiddleware.userAuthenticate, joblistController.addJoblist);

router.put('/deletejob/:id', joblistController.deletejoblist);

router.get('/totaljobs', userMiddleware.userAuthenticate, joblistController.gettotaljobslist);

module.exports=router;
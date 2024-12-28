const express = require('express');

const router= express.Router();

const userMiddleware=require('../Middleware/authentication');
const companyController=require('../Controller/company');

router.post('/addcompany', userMiddleware.userAuthenticate, companyController.addCompany);

router.get('/getcompany', userMiddleware.userAuthenticate, companyController.getCompanies);

router.get('/getcompanydetails/:id', companyController.getCompanyDetails);

router.put('/updatecompanydetails/:id', companyController.updateCompanydetails);

module.exports= router;
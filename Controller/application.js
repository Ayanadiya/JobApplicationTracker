const { where } = require('sequelize');
const Application= require('../Model/application');

exports.getApplication=  async (req,res,next) => {
    try {
        const userId=req.user.id;
        const applications= await Application.findAll({
            attributes:['id','jobtitle', 'company'],
            where:{userId:userId}
        });
        const plainApplications = applications.map(app => app.get({ plain: true }));
        res.status(200).json(plainApplications)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.addApplication= async (req,res,next) =>{
    try {
        const userId=req.user.id;
        const { jobtitle,company,description,applydate,status,notes,resumeUrl,cvUrl}=req.body
        const application= await Application.create({
            jobtitle:jobtitle,
            company:company,
            description:description,
            applydate:applydate,
            status:status,
            notes:notes,
            resume:resumeUrl,
            coverletter:cvUrl,
            userId:userId
        })
        res.status(201).json(application);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.updateApplication= async (req,res,next) =>{
    try {
        const applnId=req.params.applnId;
        const { jobtitle,company,description,applydate,status,notes,resumeUrl,cvUrl}=req.body
        const application= await Application.findOne({where:{id:applnId}});
        application.jobtitle=jobtitle;
        application.company=company;
        application.description=description;
        application.applydate=applydate;
        application.status=status;
        application.notes=notes;
        application.resume=resumeUrl;
        application.coverletter=cvUrl;
        await application.save();
        res.status(201).json(application);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getApplicationdetails= async (req,res,next) => {
    try {
        const applnId=req.params.applnId;
        const application= await Application.findByPk(applnId);
        console.log(application);
        res.status(200).json(application);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }   
}
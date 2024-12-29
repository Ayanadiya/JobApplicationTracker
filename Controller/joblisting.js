const { where } = require('sequelize');
const Joblist=require('../Model/joblist');

exports.getJoblists= async (req,res,next) => {
    try {
        const userId=req.user.id;
        const joblists= await Joblist.findAll({where:{userId:userId}});
        res.status(200).json(joblists);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.addJoblist= async (req,res, next) => {
    try {
        const userId=req.user.id;
        const {jobtitle, company, link}=req.body;
        const joblist= await Joblist.create({
            jobtitle:jobtitle,
            company:company,
            applylink:link,
            userId:userId
        })
        res.status(201).json(joblist);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.deletejoblist= async(req,res,next) =>{
    try {
        const id=req.params.id;
        const joblist= await Joblist.findByPk(id);
        await joblist.destroy();
        res.status(200).json({message:'Joblist deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }   
}
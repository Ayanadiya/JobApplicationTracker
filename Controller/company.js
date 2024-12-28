const { where } = require('sequelize');
const Company=require('../Model/company');


exports.addCompany= async (req,res,next)=>{
    try {
        const userId=req.user.id;
        const {name, size, industry, contact, notes} = req.body;
        const company= await Company.create({
            name:name,
            size:size,
            industry:industry,
            contact:contact,
            notes:notes,
            userId:userId
        })
        res.status(201).json(company);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getCompanies= async (req,res,next) =>{
    try {
        const userId=req.user.id;
        const companies= await Company.findAll({
            attributes:['id', 'name'],
            where:{userId:userId}
        })
        res.status(200).json(companies)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getCompanyDetails= async (req,res,next) => {
    try {
        const Id=req.params.id;
        const company= await Company.findByPk(Id);
        res.status(200).json(company)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.updateCompanydetails= async (req,res,next) => {
    try {
        const Id=req.params.id;
        const {name, size, industry, contact, notes} = req.body;
        const company= await Company.findByPk(Id);
        company.name=name;
        company.size=size;
        company.industry=industry;
        company.contact=contact;
        company.notes=notes
        await company.save()
        res.status(200).json(company)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
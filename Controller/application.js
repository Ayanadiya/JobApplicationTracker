const { where, Op } = require('sequelize');
const Application= require('../Model/application');
const Reminder= require('../Model/reminder');
const { application } = require('express');

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

exports.setReminder = async (req,res,next) => {
    try {
        const { applicationId, userId, reminderDate } = req.body;
        // Create a new reminder in the database
        const reminder = await Reminder.create({
            reminderDate: new Date(reminderDate),
            status:"pending",
            userId:userId,
            aplicationId:applicationId
        });
        res.status(201).json({ message: "Reminder set successfully", reminder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.getapplicationsummary= async (req,res,next) =>{
    try {
        const userId=req.user.id;
        const totalApplications = await Application.count({where:{userId:userId}});
        const applications= await Application.findAll({
            attributes:['status'],
            where:{userId:userId}
        });
        console.log(applications);
        let applied=0;
        let interviewing=0;
        let offered=0;
        let rejected=0;
        applications.forEach(application =>{
            if(application.status==='Applied')
            {
                applied++
            }
            else if(application.status==='Interviewing')
            {
                interviewing++
            }
            else if(application.status==='Offer Recieved')
            {
                offered++
            }
            else
            {
                rejected++
            }
        })
        res.status(200).json({totalApplications:totalApplications, applied:applied, interviewing:interviewing, offered:offered, rejected:rejected})
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

exports.getsearchapplication = async (req, res, next) => {
    try {
        const userId= req.user.id;
        const { search, status, startDate} = req.query;

        // Build dynamic where conditions based on filters
        let whereConditions = { userId: userId };

        if (search) {
            // Search by Job Title or Company Name
            whereConditions[Op.or] = [
                { jobtitle: { [Op.like]: `%${search}%` } },
                { company: { [Op.like]: `%${search}%` } }
            ];
        }

        if (status) {
            whereConditions.status = status; // Filter by status
        }

        if (startDate) {
            // Filter by date
            whereConditions.applydate = { [Op.gte]: new Date(startDate) };
            };

        // Fetch applications based on the dynamic conditions
        const applications = await Application.findAll({
            where: whereConditions
        });

        // Return filtered applications
        res.status(200).json(applications);
    } catch (error) {
        console.log('Error fetching applications:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};
const User=require('../Model/user');
const Profile=require('../Model/profile');
const { where } = require('sequelize');

exports.updateprofile=async (req,res,next) => {
    try {
        const userId=req.user.id;
    const {name, role, jobPreference, joblocation} = req.body;
    if(req.user.username!==name)
    {
       const user= await User.findByPk(userId);
       user.username=name;
       await user.save()
    }
    let profile= await Profile.findOne({where:{userId:userId}});
    if(!profile)
    {
        profile= await Profile.create({
            role:role,
            jobPreference:jobPreference,
            locationPreference:joblocation,
            userId:userId
        });
        return res.status(201).json(profile);
    }
    profile.role=role;
    profile.jobPreference=jobPreference;
    profile.locationPreference=joblocation;
    await profile.save();
    res.status(200).json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }   
}

exports.updatePersonalInfo= async (req,res,next) => {
    try {
        const userId=req.user.id;
        const {phone, address} =req.body;
        let profile= await Profile.findOne({where:{userId:userId}});
        if(!profile)
        {
            let profile= Profile.create({
                phone:phone,
                address:address,
                userId:userId
            })
            return res.status(201).json(profile)
        }
        profile.phone=phone;
        profile.address=address;
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.updateCareergoal= async (req,res,next) => {
    try {
        const userId=req.user.id;
        const {careergoal} =req.body;
        let profile= await Profile.findOne({where:{userId:userId}});
        if(!profile)
        {
            let profile= Profile.create({
                careerGoals:careergoal,
                userId:userId
            })
            return res.status(201).json(profile)
        }
        profile.careerGoals=careergoal;
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
const User=require('../Model/user');
const Profile=require('../Model/profile');

const path=require('path');
 
require('dotenv').config();

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { where } = require('sequelize')

exports.postsignup= async (req,res) => {
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const password=req.body.password;

    if(!name || !email || !phone || !password)
    {
        return res.status(400).json({message:'All fields are required'});
    }

    try {
        const saltround=10;
        const hashedpassword= await bcrypt.hash(password,saltround);
        const user= await User.create({
            username:name,
            email:email,
            phone:phone,
            password:hashedpassword,
            active:false
        })
        res.status(201).json({userdata:user, message:"Successfuly signed up"})
    } catch (error) {
        if(error.name==='SequelizeUniqueConstraintError')
        {
            res.status(400).json({message:"Email already have account, Please Login"});
            return;
        }
        console.log(error);
        res.status(500).json({error:error, message:"Could not add user"});
    }
}


function generateAcesstoken(id, name){
    return jwt.sign({userId:id, name:name}, process.env.SECRETKEYJWT);
}

exports.postlogin= async (req,res, next) => {
    const {email, password} =req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const user= await User.findOne({where:{email:email}});
        if(user)
        {
            const isMatch= await bcrypt.compare(password, user.password);
            if(isMatch)
            {
                user.active=true;
                await user.save();
                return res.status(200).json({message:'Login successfuly', token:generateAcesstoken(user.id,user.username)})
            }
            else
            {
                return res.status(401).json({message:"Invalid Password"});
            }
        }
        res.status(404).json({message:"User not found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong, Please try again"});
    }
}

exports.getUserDetails = async (req,res,next) => {
    try {
        const userId=req.user.id;
        const profile= await Profile.findOne({where:{userId:userId}});
        if(!profile)
        {
            return res.status(200).json({message: 'Profile not found for the user',user:req.user,  profile: {
                jobPreference: '',
                locationPreference: '',
                phone: '',
                address: '',
                careerGoals: '',
                role: ''
            }})
        }
        res.status(200).json({user:req.user, profile:profile});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'backend error', error});
    }
}




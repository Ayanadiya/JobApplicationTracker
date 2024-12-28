const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const fileUpload = require('express-fileupload');

require('dotenv').config();

const sequelize=require('./Util/db');
const cron=require('./services/cronsendEmail');

const homeRouter=require('./Routes/home');
const userRouter=require('./Routes/user');
const profileRouter=require('./Routes/profile');
const applicationRouter=require('./Routes/application')
const errorController=require('./Controller/error');


const User=require('./Model/user');
const Profile=require('./Model/profile');
const Application=require('./Model/application');
const Reminder=require('./Model/reminder');

const app=express();

app.use(cors({
    origin:"*"
}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Dom')));
app.use(express.static(path.join(__dirname, 'Views')));

app.use(fileUpload({
    createParentPath: true,
    limits: { fileSize: 5 * 1024 * 1024 }, // file size limit = 5 MB
    abortOnLimit: true
}));

app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/profile', profileRouter);
app.use('/application', applicationRouter);
app.use(errorController.errorpage);

User.hasOne(Profile);
Profile.belongsTo(User);
User.hasMany(Application);
Application.belongsTo(User);
User.hasMany(Reminder);
Reminder.belongsTo(User);
Application.hasMany(Reminder);
Reminder.belongsTo(Application);

sequelize.sync({alter:true})
.then(result => {
    console.log("Database ready");
    app.listen(process.env.PORT);  
})
.catch(err => console.log(err));
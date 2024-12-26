const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');

require('dotenv').config();

const sequelize=require('./Util/db');

const homeRouter=require('./Routes/home');
const userRouter=require('./Routes/user');
const errorController=require('./Controller/error');


const User=require('./Model/user');


const app=express();

app.use(cors({
    origin:"*"
}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'Dom')));
app.use(express.static(path.join(__dirname, 'Views')));

app.use('/', homeRouter);
app.use('/user', userRouter);
app.use(errorController.errorpage);

sequelize.sync()
.then(result => {
    console.log("Database ready");
    app.listen(process.env.PORT);  
})
.catch(err => console.log(err));
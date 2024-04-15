const express=require('express');
const app=express();
const dotenv = require("dotenv");
const database=require('./config/database');
const authRoutes=require('./routes/Auth');
const jobRoutes=require('./routes/Job');
dotenv.config();
app.use(express.json());
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/job',jobRoutes);
app.listen(process.env.PORT,()=>{
    database.dbConnect();
    console.log("server is started");
})
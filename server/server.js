const express=require('express');
const cookieparser=require('cookie-parser');
const fileUpload = require("express-fileupload");
const app=express();
const dotenv = require("dotenv");
const cors=require('cors');
const database=require('./config/database');
const authRoutes=require('./routes/Auth');
const jobRoutes=require('./routes/Job');
dotenv.config();
app.use(cookieparser());
app.use(express.json());

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/job',jobRoutes);
app.listen(process.env.PORT,()=>{
    database.dbConnect();
    console.log("server is started");
})
import express from 'express'; //Requests vgrh call krne ke liye
import colors from 'colors'; //colours laane ke liye thode se 
import dotenv from 'dotenv';  //Port ko private rkhne ke liye
import morgan from 'morgan'; // provides logging functionality for HTTP requests. It logs information about incoming requests and outgoing responses, helping you to monitor and debug your application.
import connectDB from './config/db.js'; //DB se connect and stuff
import authRoute from './routes/authRoute.js'
//configure env
dotenv.config();

//rest object
const app= express(); 

//database config
connectDB();

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth",authRoute);

//rest api
app.get('/',(req,res) => {
    res.send("<h1> Welcome to E-Commerce MERN Stack APP </h1>"
    );
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server is Running in ${process.env.DEV_MODE} mode on ${PORT}` .bgCyan.white)
});


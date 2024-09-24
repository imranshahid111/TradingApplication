import express from "express";
import dotenv from 'dotenv'
import auth from './Routes/auth.js'
import connectDB from './Config/db.js';

dotenv.config();

connectDB();

const app = express();


app.use(express.json());

app.use('/api/v1/auth', auth);




app.get('/',(req,res)=>{
    res.send("Hello from backend");
})

app.listen(process.env.PORT || 8001,()=>{
    console.log(`Running Port on http://localhost:${process.env.PORT}`.bgCyan.white);
})

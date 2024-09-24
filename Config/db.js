import mongoose from "mongoose";
import colors from 'colors'
const connectDB = async ()=> {
    try{
            const con = await mongoose.connect(process.env.Mongo_URL)
            console.log(`Connected to  Mongo DB ${con.connection.host}`.bgMagenta.white)
    }
    catch (error){
        console.log(`Error in Mongodb ${error}`.bgRed.white)
    }
};

export default connectDB;
import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
name : {
    type : String,
    required : true,
    trim : true
},
username : {
    type : String,
    required : true,
    unique : true,
},
password : {
    type : String ,
    requiured : true,
}
})

const User = mongoose.model('Users', userSchema);

export default User;
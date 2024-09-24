import User from "../Models/Users.js";
import bcrypt from 'bcrypt'

export const registerController = async (req, res) => {
    try {
        const { name, username, password } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }
        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username is required",
            });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required",
            });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const user = new User({
            name,
            username,
            password,
        });
        try {
            await user.save();
        } catch (error) {
            console.error('Error saving user:', error);
            return res.status(500).json({
                success: false,
                message: "Error in saving",
                error: error.message,
            });
        }

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in registration",
            error: error.message, 
        });
    }
};



export const loginController = async(req,res) =>{
    try {
        const { username , password} = req.body;
        if(!username || !password)
        {
            return res.status(400).json({
                success : false,
                message :"Invalid Username or Password"
            })
        }
        
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).send({
                success : false,
                message : "Username not exist",
            })

        }
        if (user.password !== password) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }
            res.status(201).send({
                success :true,
                message :"Login Successfull",
                user : {
                    name : user.name,
                    username : user.username,
                }
            })
    } catch (error) {
        res.status(500).json(
            {
                success : false,
                message: "Error in login",
                error,
            }
        )
    }
}
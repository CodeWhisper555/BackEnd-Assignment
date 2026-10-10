const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {makeToken} = require("../utils/makeToken");

exports.login = async (req,res,next) =>{
    try{
        const {email,password} = req.body;
        
        if(!email){
            return res.status(401).json({
                message : "Email not found"
            });
        }

        if(!password){
            return res.status(401).json({
                message : "Password not found"
            });
        }
        
        if(password.length < 6){
            return res.status(401).json({
                message : "Password length must atleast be 6"
            });
        }

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(401).json({
                message : "User doesn't exist"
            });
        }

        const ok = await bcrypt.compare(password,user.password);

        if(!ok){
            return res.status(400).json({
                message : "Invalid email or password"
            });
        }

        res.status(201).json({
            message : "User logged in Successfully",
            token : makeToken(user)
        });
    }
    catch(err){
        next(err);
    }
}

exports.register = async (req,res,next) =>{
    try{
        const {name,email,password,confirmPassword} = req.body;
        if( !name || !email || !password){
            return res.status(400).json({
                message : "Please provide name,email and password"
            });
        }
        if(password != confirmPassword){
            return res.status(400).json({
                message : "Enter the same password and ConfirmPassword"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,email,password : hashedPassword
        });
        res.status(201).json({
            message : "User Registered Successfully",
            token : makeToken(user)
        });
    }
    catch(err){
        next(err);
    }
}
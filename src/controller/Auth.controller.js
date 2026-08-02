const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

//POST REQUEST FOR REGISTERING A USER
const RegisterAuth = async (req, res) => {
    const { emails, name, accountType, passwords } = req.body;

    const isEmailExist = await User.findOne({ emails });
    if (isEmailExist) {
 
        return res.status(400).json({ message: "Email already exists" });
    }
    const NewUser = await User.create({ emails, name, accountType, passwords });
    const Token = jwt.sign({ id: NewUser._id}, process.env.JWT_TOKEN, {expiresIn : "1h"});
    const sendCookiewithToken  = res.cookie("token",Token);
    return res.status(201).json({
        user : {
            id: NewUser._id,
            emails: NewUser.emails
        },
        message: "User registered successfully",
        token: Token
    });
    
}

//Post request for login a user
const LoginAuth = async (req, res) =>{
    const {emails, passwords, name, Token} = req.body;
    const hasUser = await User.findOne({emails});
    if (!hasUser){
        return res.status(400).json({messsage: "User Not Found"})
    }
    const matchedPassword = await hasUser.compare_passwords(passwords);
    if (!matchedPassword){
        return res.status(400).json({message: "Invalid Password"})
    }
}

module.exports = {
    RegisterAuth, LoginAuth
}
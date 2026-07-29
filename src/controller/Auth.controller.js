const User = require("../models/user.model.js");

const RegisterAuth = async (req, res) => {
    const { emails, name, accountType, passwords } = req.body;

    const isEmailExist = await User.findOne({ emails });
    if (isEmailExist) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const NewUser = await User.create({ emails, name, accountType, passwords });
    return res.status(201).json({ message: "User Registered Successfully" });
    
}

Module.exports = {
    RegisterAuth
}
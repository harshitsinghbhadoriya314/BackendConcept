const userModel = require("../models/user.model")
const JWT = require("jsonwebtoken")

const AuthMiddleware = async(req, res, next) => {
    const verifyToken = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!verifytoken){
        return res.status(401).json({message: "Unauthorized"})
    }
    try{
        const decoded_JWT = JWT.verify(verifyToken, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded_JWT.userId).select("password");
        req.user = user;
        return next();
    }
    catch(err){
        return res.status(401).json({message: "Unauthorized , token is not Valid"})
    }

}
module.exports = AuthMiddleware;
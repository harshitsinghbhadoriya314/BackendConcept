const mongoose =require("mongoose");

const AccountSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId, ref : "users", required : [true , "User is required"]
    },
    userID :{
        type : String, required : [true , "User ID is required"], minlength : [12 , "Valid Number Only"]
    }, 
    AccountNumber :{
        type : Number , required : [true , "Account Number is required"], minlength : [12 , "Valid length Only"]
    }, 
    Uniquecode :{
        type : Number , required : [true , "Unique Code is required"], minlength : [12 , "Valid length Only"]
    }, 
    Status : {
        type : String,
        enum : {
            Values : ["Active" , "Closed" ,"Frozen"], 
        }
}} , {
    timestamps : true
})

module.exports = Account = mongoose.model("accounts", AccountSchema);
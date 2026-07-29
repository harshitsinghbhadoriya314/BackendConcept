const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    emails: {
        type: String, required: [true, "Compulsory"], lowercase: true, trim: true, match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"], unique : true
    },
    name : {
        type: String, required: [true, "Compulsory"], lowercase: true, trim: true
    },
    accountType : {
        type: String, required: [true, "Compulsory"], trim:true
    }, 
    passwords : {
        type: String, required: [true, "Compulsory"], trim:true, minlength: [8, "Password must be at least 8 characters long"]
    }
}, {
    timestamps : true
});

userSchema.pre('save', async function(next){
    if (!this.isModified('passwords')){
        return next()
    }
    const hash = await bcrypt.hash(this.passwords, 10);
    this.passwords = hash;
    return next();
});

userSchema.methods.compare_passwords = async function(passwords){
    return await bcrypt.compare(passwords, this.passwords);
}
const User = mongoose.model("users", userSchema);
module.exports = User;
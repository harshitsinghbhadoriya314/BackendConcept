const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    emails: {
        type: String, required: [true, "Compalsory"], lowercase: true, trim: true
    },
    name : {
        type: String, required: [true, "Compalsory"], lowercase: true, trim: true
    },
    accountType : {
        type: String, required: [true, "Compalsory"], trim: true
    }
})
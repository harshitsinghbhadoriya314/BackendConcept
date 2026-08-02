const mongoose = require("mongoose");

const historyModel = new mongoose({
    PrevBalanace :{
       type : Number , min : [0 , "Greater than 0" ], required : [true] 
    },
    CurrentBalance : {
        type : Number , required : [true]
    }, 
    TransactionTime : {
        type : Date , required : [true]
    }, 
    Ways_of_Transaction : {
        type : String, 
        enum : {
            Values : ["Credit" , "Debit"]
        },
        required : [true]
    }

})
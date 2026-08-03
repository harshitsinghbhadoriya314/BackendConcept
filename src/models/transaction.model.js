const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
   fromAccount :{
    type : Number ,ref: "accounts", required  : [true, "From Account is Required"], minlength : [12, "only 12 digit Account Number"]
 , index : true}, 
   ToAccount :{
    type : Number , ref: "accounts", required  : [true, "To Account is Required"], minlength : [12, "only 12 digit Account Number"]
  ,index },
   Balance :{
     type : Number, ref : "accounts", required : [true, "Balance is Required"] , min : [0, "Balance cannot be negative"]
   },
   Transaction_status : {
     type : String,
     enum :{
        Values : ["Pending", "Completed", "Failed"]
     },
     required : [true, "Transaction Status is Required"], default : "pending"
   }, 
   LastUpdated :{
    type : Date, default: Date.now
   }, 
   KeyforValid : {
    type : String , required : [true, "Key for Validation is Required"], minlength : [12, "only 12 digit Key"]
   }
}, {
    timestamps : true
})
const BankingTransactionModel = mongoose.model("transactions", TransactionSchema);
module.exports = BankingTransactionModel;
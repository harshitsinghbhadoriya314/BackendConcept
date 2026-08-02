const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
   fromAccount :{
    type : Number , required  : [true, "From Account is Required"], minlength : [12, "only 12 digit Account Number"]
 , index : true}, 
   ToAccount :{
    type : Number , required  : [true, "To Account is Required"], minlength : [12, "only 12 digit Account Number"]
  ,index },
   Balance :{
     type : Number, required : [true, "Balance is Required"] , min : [0, "Balance cannot be negative"]
   },
   Transaction_status : {
     type : String,
     enum :{
        Values : ["pending","Active", "Completed", "Failed"]
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
const mongoose = require("mongoose");

const historyModel = new mongoose.Schema({
    AccountNumber : {
        type : Number , ref : "accounts", required : [true, "Account Number is Required"], immutable : true, minlength : [12, "only 12 digit Account Number"]
    }, 
    Transaction: {
        type : mongoose.Schema.Types.ObjectId, ref : "transactions",immutable : true, required : [true, "Transaction ID is Required"]
    }, 
    Amount :{
      type : Number, ref : "accounts", required : [true, "Amount is Required"] ,immutable : true, min : [0, "Amount cannot be negative"]
    }, 
    LastUpdate:{
      type : Date , defualt : Date.now, required : [true, "Last Update is Required"], immutable : true
    }, 
    Waysof_transaction :{
        type : String, enum :{
            Values : [Credit, Debit]
        }, immutable : true, required : [true, "Way of Transaction is Required"]
    }
})

// history of any transaction can not change or update :
function BreaksChanges(){
   throw new Error ("Transaction History cannot be modified or updated")
}

historyModel.pre('updateMany', BreaksChanges)
historyModel.pre('findOneAndUpdate', BreaksChanges)
historyModel.pre('updateOne', BreaksChanges)
historyModel.pre('Remove', BreaksChanges)
historyModel.pre('deleteOne', BreaksChanges)
historyModel.pre('deleteMany', BreaksChanges)

const TransactionHistoryModel = mongoose.model("transaction_history", historyModel);
module.exports = TransactionHistoryModel;
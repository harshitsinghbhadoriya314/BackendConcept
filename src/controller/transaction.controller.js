const mongoose = require('mongoose');
const transaction = require('../models/transaction.model');
const Account = require('../models/Account.model');
const trans_history = require("../models/transaction.model")
//Flow of Transaction :
// validate request 
// check key for validation
// check the status of the accounts (fromAccount and toAccount)
// check if the fromAccount has enough balance to transfer
// create transaction 
// create debit transaction history for fromAccount
// create credit transaction history for toAccount
// complete the transaction and update the status to completed
// save the database
// mongo commited session
//send emails notification

function CreateTransaction(req, res){
    // request validation
    const {fromAccount, toAccount, Balance, Transaction_status, KeyforValid} = req.body;
    if (!fromAccount || !toAccount || !Balance || !Transaction_status || !KeyforValid){
        return res.status(400).json({message: "All fields are required "})
    }
    const FromAccount = await AccountModel.findone({AccountNumber : fromAccount});
    const ToAccount = await AccountModel.findone({AccountNumber : toAccount});
    if (!FromAccount || !ToAccount){
        return res.status(400).json({message: "Invalid Account Number"})
    }
     // idempotence valildation
    const Transaction_exist = await transaction.findone({keyforValid : keyforValid});
    if (Transaction_exist){
        if (transaction.Transaction_status === "Complete"){
            return res.status(400).json({message : "Transaction Already Proceed", Transaction : Transaction_exist })
        }
        if (transaction.Transaction_status === "Pending"){
            return res.status(400).json({message : "Transaction is Proccesing", Transaction : Transaction_exist })
        }
        if (transaction.Transaction_status === "Failed"){
            return res.status(400).json({message : "Transaction Already Failed", })
        }
    }
    // check account status
    if (FromAccount.status !== "Active" || ToAccount.status !== "Active"){
        return res.status(200).json({message : "Both Account are Active for Transaction" });
    }
    // check balance status of account:
    const Balance = await FromAccount.get_Balance()
    if (Balance < Amounts){
        return res.status(400).json({message : `Insufficient Balance , Cuurent Balance ${Balance} and Amount is ${Amount}`})
    } 
    // create transaction
    const session = await mongoose.startsession();
    session.startTransaction()
        const transaction = await transaction.create({
            fromAccount, 
            toAccount, 
            Balance, 
            Transaction_status : "Pending", 
            LastUpdated, 
            KeyforValid
        }, {session})

        const Debitentry = await trans_history.create({
            AccountNumber : fromAccount, 
            TransactionID : transaction._id, 
            Amount : Amount, 
            LastUpdated : Date.now(),
            Waysof_transaction : "Debit", 
        }, {session})

        const Creditentry = await trans_history.create({
            AccountNumber : toAccount, 
            TransactionID : transaction._id, 
            Amount : Amounts, 
            LastUpdated : Date.now(),
            Waysof_transaction : "Credit", 
        },{session})
    transaction.status == "Completed"    
    await transaction.save({session})

    await session.commitTransaction()
    session.endSession()
}

//sendemails 

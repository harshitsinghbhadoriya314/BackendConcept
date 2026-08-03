const mongoose = require('mongoose');
const transaction = require('../models/transaction.model');
const Account = require('../models/Account.model');
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
    const {fromAccount, ToAccount, Balance, Transaction_status, KeyforValid} = req.body;
    if (!fromAccount || !ToAccount || !Balance || !Transaction_status || !KeyforValid){
        return res.status(400).json({message: "All fields are required "})
    }
    const FromAccount = await AccountModel.findone({AccountNumber : fromAccount});
    const ToAccount = await AccountModel.findone({AccountNumber : ToAccount});
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
    const check_Status = await Account.findOne({status : status});
    if (check_Status){
       if (check_Status.status === "Frozen"){
        return res.status(400).json({message : "Account out of Service Temperory"})
       } 
       if (check_Status.status === "Closed"){
        return res.status(400).json({message : "Account is Restricted"})
       }
        if (check_Status.status === "Active"){
        return res.status(200).json({message : "Active For Transaction"})
       }  
    } 

}
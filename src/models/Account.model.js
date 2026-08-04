const mongoose = require("mongoose");
const transactionModel = require("../models/trans_history.model.js")
const transaction = require("../models/transaction.model.js")
const AccountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "users", required: [true, "User is required"]
    },
    userID: {
        type: String, required: [true, "User ID is required"], minlength: [12, "Valid Number Only"]
    },
    AccountNumber: {
        type: Number, required: [true, "Account Number is required"], minlength: [12, "Valid length Only"]
    },
    Uniquecode: {
        type: Number, required: [true, "Unique Code is required"], minlength: [12, "Valid length Only"]
    },
    Status: {
        type: String,
        enum: {
            Values: ["Active", "Closed", "Frozen"],
        }
    }
}, {
    timestamps: true
})

AccountSchema.methods.get_Balance = async function () {
    // const transaction_type = await transactionModel.findone({ type: Waysof_transcation })
    // const transaction_amount = await transactionModel.findone({ amount: Amount })
    // const initialBalance = await transaction.findone({ balance: Balance });
    // const debit = 0;
    // const credit = 0;
    // if (transaction_type === "Debit") {
    //     const Debit = Amount;
    //     Balance -= Debit
    //     return Balance;
    // }
    // else {
    //    credit = Amount
    //    Balance += credit
    //    return Balance;
    // }
    const balanceData = await transactionModel.aggregrate([
        { $match : {account : this._id}  }, 
        { $group : {
            _id : null, 
            totalDebit : {
                $sum : {
                    $cond : [
                        { $eq : ["$type", "Debit"]},
                        "$amount", 
                         0
                    ]
                }
            },
            totalCredit : {
                $sum : {
                    $cond : [
                        { $eq : ["$type", "Credit"]},
                        "$amount", 
                         0
                    ]
                }
            }
        }},
        {
            $project :{
                _id : 0,
                $balance : {$substract : ["$totalDebit", "$totalCredit"]}
            }
        }
    ])
    if (balanceData.length === 0 ){
        return 0;
    }
    return balanceData[0].balance
}
module.exports = Account = mongoose.model("accounts", AccountSchema);
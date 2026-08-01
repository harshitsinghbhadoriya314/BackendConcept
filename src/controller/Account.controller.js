const Accounts = require('../models/Account.model');

const CreateAccount =async (req, res) =>{
  const {username, userID, accountNumber, uniquecode} = req.body;

  const is_AccountExist = await Accounts.findone({accountNumber});
  if (is_AccountExist){
    return res.status(400).json({message: "Account Number already exists"})
  }
  const NewAccount = await Accounts.create({username, userID, accountNumber, uniquecode});
  return res.status(201).json({
    account : {
        id: NewAccount._id, 
        username: NewAccount.username,
        userID: NewAccount.userID,
        accountNumber: NewAccount.accountNumber,
        uniquecode: NewAccount.uniquecode
    }   
  })

}
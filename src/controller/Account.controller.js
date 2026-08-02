const Accounts = require('../models/Account.model');

const CreateAccounts =async (req, res) =>{
   const user = req.user;
   const accountNumber = await Accounts.create({
    userId : user._id,
   })
   return res.status(200).json({message : "Account Created Successfully", accountNumber})
}
module.exports = CreateAccounts;
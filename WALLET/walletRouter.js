const express = require ('express')
const router = express.Router()
const {registerUser,Walletlogin,activateAccount, findUserByPhrase} = require('./controller/walletController')

router.post("/registerWalletUser", registerUser)
router.post("/loginWallet",  Walletlogin)
router.post("/activateAccount",  activateAccount)
router.get("/findUserByPhrase", findUserByPhrase)


module.exports = router
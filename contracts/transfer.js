const Web3 = require('web3');
const web3 = new Web3('http://joseantcordeiro.hopto.org:8545');
var value  = web3.utils.toHex(web3.utils.toWei("100"));
var privateKey = '0xcbcbd28a2603b8c61f529214101dcc3180919c1e36a002a6de471927fe0d56cd';
var tokenAddress = '0x349B14d95a5Fd8fFB19B82366afA94AA975f27af';
var toAddress = '0x5EfEf10B2a08d3E79B163AB18C50f77d5fB0Aa98';
var fromAddress = '0x5EfEf10B2a08d3E79B163AB18C50f77d5fB0Aa98';
var contract = new web3.eth.Contract(abi, tokenAddress, { from: fromAddress });
var data = contract.methods.transfer(toAddress, value).encodeABI();
var txObj = {
       "gas": web3.utils.toHex(100000),
       "to": tokenAddress,
       "value": "0x00",
       "data": data,
       "from": fromAddress
   };
web3.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
       if (err) {
           return callback(err)
       } else {
           console.log(signedTx)
           return web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
               if (err) {
                   console.log(err)
               } else {
                   console.log(res)
               }
           })
       }
   });

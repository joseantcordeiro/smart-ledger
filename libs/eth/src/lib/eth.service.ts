import { Injectable } from '@nestjs/common';
import { Web3Service } from "nest-web3";
import { KV2VaultClient, Vault } from '@ledger/vault';
import fs = require('fs');
import solc = require('solc');
import { abi, bytecode } from './constants';

const vault = new Vault({
	vaultAddress: "http://joseantcordeiro.hopto.org:8200",
	vaultToken: "s.AwmKlMHrVdNq3GNyM88C1SyY"
});

@Injectable()
export class EthService {
	constructor(
		private readonly web3Service: Web3Service) {}

		private web3 = this.web3Service.getClient('eth');
		private kv2: KV2VaultClient = vault.KV(2);

		private async compileAsset() {
			const source = fs.readFileSync('LedgerCoin.sol', 'utf8');

			// Create input object
			const input = {
				language: 'Solidity',
				sources: {
						'LedgerCoin.sol': {
							content: source,
						},
				},
				settings: {
						outputSelection: {
							'*': {
									'*': ['*'],
							},
						},
				},
			};
			// Compile the contract
			const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
			const contractFile = tempFile.contracts['LedgerCoin.sol']['Incrementer'];

			return contractFile;
		}

		public async deployAsset(address: string, name: string, symbol: string): Promise<string> {
			const secret = await this.kv2.read(address);

			// 3. Create address variables
			const accountFrom = {
				privateKey: secret.data.data.privateKey,
				address: address,
			};

			// 6. Create contract instance
			const ledgerCoin = new this.web3.eth.Contract(abi);

			// 7. Create constructor tx
			const ledgerCoinTx = ledgerCoin.deploy({
				data: bytecode,
				arguments: [name, symbol]
			});

			// 8. Sign transacation and send
			const createTransaction = await this.web3.eth.accounts.signTransaction(
				{
					data: ledgerCoinTx.encodeABI(),
					gas: await ledgerCoinTx.estimateGas(),
				},
				accountFrom.privateKey
			);

			// 9. Send tx and wait for receipt
			const createReceipt = await this.web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
			return createReceipt.contractAddress;	
		}

		public async createAccount(): Promise<string> {
			
			const ethAccount = this.web3.eth.accounts.create();

			await this.kv2.create(ethAccount.address, {
				data: {
						privatekey: ethAccount.privateKey,
				},
			});

			return ethAccount.address;
		}

		public async getBalance(address: string, contract: string): Promise<{ balance: number, decimals: number}> {
			const ledgerCoin = new this.web3.eth.Contract(abi, contract);

			return {
				balance: await ledgerCoin.methods.balanceOf(address).call(),
        decimals: await ledgerCoin.methods.decimals().call(),
			};
		}

		public async transfer(fromAddress: string, toAddress: string, tokenAddress: string, amount: number): Promise<{ hash: string, status: boolean }> {
			const ledgerCoin = new this.web3.eth.Contract(abi, tokenAddress, { from: fromAddress });
			const secret = await this.kv2.read(fromAddress);

			const privateKey = secret.data.data.privateKey;
			const value  = this.web3.utils.toHex(this.web3.utils.toWei(String(amount)));

			const data = ledgerCoin.methods.transfer(toAddress, value).encodeABI();

			const txObj = {
				"gas": this.web3.utils.toHex(100000),
				"to": tokenAddress,
				"value": "0x00",
				"data": data,
				"from": fromAddress
			};

			const tx = await this.web3.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
				if (err) {
					console.log(err);
					throw new Error(err.message);
				} else {
					console.log(signedTx)
					return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
						if (err) {
							console.log(err);
							throw new Error(err.message);
						} else {
							console.log(res);
						}
					})
				}
			});

			// const receipt = await this.web3.eth.getTransactionReceipt(tx.transactionHash);

			return { hash: tx.transactionHash, status: false };
		}

		public async getTransactionReceipt(hash: string) {

			return this.web3.eth.getTransactionReceipt(hash);

		}

		public async mint(adminAddress: string, toAddress: string, tokenAddress: string, amount: number): Promise<string> {
			const ledgerCoin = new this.web3.eth.Contract(abi, tokenAddress, { from: adminAddress });
			const secret = await this.kv2.read(adminAddress);

			const privateKey = secret.data.data.privateKey;
			const value  = this.web3.utils.toHex(this.web3.utils.toWei(String(amount)));
			const data = ledgerCoin.methods.mint(toAddress, value).encodeABI();

			const txObj = {
				"gas": this.web3.utils.toHex(100000),
				"to": tokenAddress,
				"value": "0x00",
				"data": data,
				"from": adminAddress
			};

			const res = await this.web3.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
				if (err) {
					console.log(err);
					throw new Error(err.message);
				} else {
					console.log(signedTx)
					return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
						if (err) {
							console.log(err);
							throw new Error(err.message);
						} else {
							console.log(res);
						}
					})
				}
			});
			
			return res.transactionHash;
		}

		public async burn(adminAddress: string, fromAddress: string, tokenAddress: string, amount: number): Promise<string> {
			const ledgerCoin = new this.web3.eth.Contract(abi, tokenAddress, { from: adminAddress });
			const secret = await this.kv2.read(adminAddress);

			const privateKey = secret.data.data.privateKey;
			const value  = this.web3.utils.toHex(this.web3.utils.toWei(String(amount)));
			const data = ledgerCoin.methods.burn(fromAddress, value).encodeABI();

			const txObj = {
				"gas": this.web3.utils.toHex(100000),
				"to": tokenAddress,
				"value": "0x00",
				"data": data,
				"from": adminAddress
			};

			const res = await this.web3.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
				if (err) {
					console.log(err);
					throw new Error(err.message);
				} else {
					console.log(signedTx)
					return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
						if (err) {
							console.log(err);
							throw new Error(err.message);
						} else {
							console.log(res);
						}
					})
				}
			});
			
			return res.transactionHash;
		}

}



import { Injectable } from '@nestjs/common';
import { Web3Service } from "nest-web3";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('request');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const solc = require('solc');

@Injectable()
export class EthService {
	constructor(
		private readonly web3Service: Web3Service) {}

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

		public async deployAsset(address: string): Promise<string> {
			const web3 = this.web3Service.getClient('eth');

			const options = {
				'method': 'GET',
				'url': 'http://joseantcordeiro.hopto.org:8200/v1/secret/data/' + address,
				'headers': {
					'X-Vault-Token': 's.AwmKlMHrVdNq3GNyM88C1SyY',
					'Content-Type': 'application/json'
				}			
			};
			const response = request(options, function (error: string | undefined, response: { body: any; }) {
				if (error) throw new Error(error);
				console.log(response.body);
			});

			// 3. Create address variables
			const accountFrom = {
				privateKey: response.body.data.data.privateKey,
				address: address,
			};

			// 4. Get the bytecode and API
			const bytecode = fs.readFileSync('LedgerCoin_sol_LedgerCoin.bin').toString();
			// const bytecode = contractFile.evm.bytecode.object;
			// const abi = contractFile.abi;
			const abi = JSON.parse(fs.readFileSync('LedgerCoin_sol_LedgerCoin.abi').toString());

			// 6. Create contract instance
			const ledgerCoin = new web3.eth.Contract(abi);

			// 7. Create constructor tx
			const ledgerCoinTx = ledgerCoin.deploy({
				data: bytecode,
			});

			// 8. Sign transacation and send
			const createTransaction = await web3.eth.accounts.signTransaction(
				{
					data: ledgerCoinTx.encodeABI(),
					gas: await ledgerCoinTx.estimateGas(),
				},
				accountFrom.privateKey
			);

			// 9. Send tx and wait for receipt
			const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
			return createReceipt.contractAddress;	
		}

		public async createAccount(): Promise<string> {
			const web3 = this.web3Service.getClient('eth');
			const ethAccount = web3.eth.accounts.create();

			const options = {
				'method': 'POST',
				'url': 'http://joseantcordeiro.hopto.org:8200/v1/secret/data/' + ethAccount.address,
				'headers': {
					'X-Vault-Token': 's.AwmKlMHrVdNq3GNyM88C1SyY',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"options": {
						"cas": 0
					},
					"data": {
						"privateKey": ethAccount.privateKey,
					}
				})
			
			};
			request(options, function (error: string | undefined, response: { body: any; }) {
				if (error) throw new Error(error);
				console.log(response.body);
			});

			return ethAccount.address;

		}

}

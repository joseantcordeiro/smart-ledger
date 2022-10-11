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
			const web3 = this.web3Service.getClient('eth');

			const secret = await this.kv2.read(address);

			// 3. Create address variables
			const accountFrom = {
				privateKey: secret.data.data.privateKey,
				address: address,
			};

			// 6. Create contract instance
			const ledgerCoin = new web3.eth.Contract(abi);

			// 7. Create constructor tx
			const ledgerCoinTx = ledgerCoin.deploy({
				data: bytecode,
				arguments: [name, symbol]
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

			await this.kv2.create(ethAccount.address, {
				data: {
						privatekey: ethAccount.privateKey,
				},
			});

			return ethAccount.address;

		}

}

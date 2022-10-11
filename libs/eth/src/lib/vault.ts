import { KV2VaultClient, Vault } from '@ledger/vault';

const vault = new Vault({
	vaultAddress: "http://joseantcordeiro.hopto.org:8200",
	vaultToken: "s.AwmKlMHrVdNq3GNyM88C1SyY"
});

async function run() {

	const client: KV2VaultClient = vault.KV(2);
/*
	const resCreate = await client.create("hello", {
		data: {
				privatekey: "myvalue",
		},
	});

	console.log(resCreate);
*/
	const resRead = await client.read('0x2037a0FF2E411D97078e6F1b6dF0233EA049926d');

	console.log(resRead.data.data.privateKey);
	
}

run();

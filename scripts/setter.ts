import { beginCell } from "ton-core";
import { mnemonicToWalletKey } from "ton-crypto";
import { WalletContractV3R2, internal } from "ton";
import { TonClient, SendMode, Address } from "ton";
import { getHttpEndpoint } from "@orbs-network/ton-access"
import dotenv from "dotenv"

dotenv.config()

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

const mnemonic: string = process.env.DEPLOYER_MNEMONIC || ""

async function sendMessage(
  client: TonClient,
  key: any,
  wallet: WalletContractV3R2,
  contractAddress: string,
  opCode: number,
  value: number
) {
  const mainContract = Address.parse(contractAddress);

  var messageBody = beginCell().storeUint(opCode, 32).endCell();
  if (opCode === 1) {
    messageBody = beginCell().storeUint(opCode, 32).storeUint(value, 32).endCell();
  }

  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();
  await sleep(2000)
  console.log(`wallet addess: ${wallet.address}, no: ${seqno}`);

  const transfer = walletContract.createTransfer({
    seqno,
    messages: [
      internal({
        to: mainContract.toString(),
        value: '0.03',
        bounce: false,
        body: messageBody
      }),
    ],
    secretKey: key.secretKey,
    sendMode: SendMode.PAY_GAS_SEPARATLY + SendMode.IGNORE_ERRORS,
  });

  await client.sendExternalMessage(wallet, transfer);

  await sleep(1000);
  console.log(` - Setting transaction sent successfully`);

  console.log(` - Waiting up to 75 seconds to check if the walletContract was actually sent..`);
  for (let attempt = 0; attempt < 30; attempt++) {
    await sleep(2500);
    const seqnoAfter = await walletContract.getSeqno();
    if (seqnoAfter > seqno) break;
  }
}

async function main() {
  try {
    var argv = JSON.parse(process.env.npm_config_argv || "")
    var contract_address = "EQBUPjE1avc6GlI8PLrglo76V9x1hsyV0mw_whKpSlmkRk2y"
    var opCode = 1
    var value = 20

    argv = argv?.original
    if (Object.keys(argv).length > 3) {
      contract_address = argv[1]
      opCode = parseInt(argv[2])
      value = parseInt(argv[3])
    }

    console.log(`walletContract: ${contract_address}`)
    console.log(`opCode: ${opCode}`)
    console.log(`value: ${value}`)

    const endpoint = await getHttpEndpoint({ network: process.env.TESTNET ? "testnet" : "mainnet" });
    const client = new TonClient({ endpoint });
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV3R2.create({
      publicKey: key.publicKey,
      workchain: 0,
    });

    await sendMessage(client, key, wallet, contract_address, opCode, value);
  } catch (error) {
    console.log("[sendmsg err]: ", error)
  }
}

main();

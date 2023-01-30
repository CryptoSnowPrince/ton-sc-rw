import { beginCell } from "ton-core";
import { mnemonicToWalletKey } from "ton-crypto";
import { WalletContractV3R2, internal } from "ton";
import { TonClient, SendMode, Address } from "ton";
import { getHttpEndpoint } from "@orbs-network/ton-access"
import dotenv from "dotenv"

dotenv.config()

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

const mnemonic: string = process.env.DEPLOYER_MNEMONIC || ""
const calledContractAddress = Address.parse(process.env.CALLED || "");
const mainContractAddress = Address.parse(process.env.CALLED || "");
const contract_address_string = process.env.npm_lifecycle_event == "setter:main" ? (process.env.MAIN || "") : (process.env.CALLED || "")

async function sendMessage(
  client: TonClient,
  key: any,
  wallet: WalletContractV3R2,
  opCode: number,
  value: number
) {
  const actionContractAddress = Address.parse(contract_address_string);

  var messageBody = beginCell().storeUint(opCode, 32).endCell();

  if (process.env.npm_lifecycle_event == "setter:called") {
    if (opCode === 1) {
      messageBody = beginCell().storeUint(opCode, 32).storeUint(value, 32).endCell();
    }
  } else if (process.env.npm_lifecycle_event == "setter:main") {
    if (opCode === 1) {
      messageBody = beginCell()
        .storeUint(opCode, 32)
        .storeUint(value, 32)
        .storeUint(0x18, 32) // header
        .storeAddress(calledContractAddress) // dist
        .storeUint(10_000_000, 32) // amount
        .storeUint(1, 32) // opcode
        .storeUint(100, 32) // val
        .storeUint(3, 32) // mode
        .endCell();
    } else if (opCode === 2) {
      messageBody = beginCell()
        .storeUint(opCode, 32)
        .storeUint(value, 32)
        .storeUint(0x18, 32)
        .storeAddress(calledContractAddress)
        .storeUint(10_000_000, 32)
        .storeUint(3, 32)
        .endCell();
    } else if (opCode === 100) {
      messageBody = beginCell().storeUint(opCode, 32).storeUint(value, 32).endCell();
    }
  }

  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();
  await sleep(2000)
  console.log(`no: ${seqno}`);

  const transfer = walletContract.createTransfer({
    seqno,
    messages: [
      internal({
        to: actionContractAddress.toString(),
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
    var opCode = 1
    var value = 20

    argv = argv?.original
    if (Object.keys(argv).length > 2) {
      opCode = parseInt(argv[1])
      value = parseInt(argv[2])
    }

    const endpoint = await getHttpEndpoint({ network: process.env.TESTNET ? "testnet" : "mainnet" });
    const client = new TonClient({ endpoint });
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV3R2.create({
      publicKey: key.publicKey,
      workchain: 0,
    });

    console.log(`contract_address_string: ${contract_address_string}`)
    console.log(`opCode: ${opCode}`)
    console.log(`value: ${value}`)
    console.log(`wallet addess: ${wallet.address}`);

    await sendMessage(client, key, wallet, opCode, value);
  } catch (error) {
    console.log("[sendmsg err]: ", error)
  }
}

main();

import { beginCell, Dictionary } from "ton-core";
import { contractAddress, Cell } from "ton-core";
import { mnemonicToWalletKey } from "ton-crypto";
import { WalletContractV3R2, internal } from "ton";
import { TonClient, SendMode, Address } from "ton";
import { getHttpEndpoint } from "@orbs-network/ton-access"
import dotenv from "dotenv"

dotenv.config()

var argv = JSON.parse(process.env.npm_config_argv || "")
const calledContractAddress = Address.parse(process.env.CALLED || "");
const mainContractAddress = Address.parse(process.env.CALLED || "");
const contract_address_string = process.env.npm_lifecycle_event == "getter:main" ? (process.env.MAIN || "") : (process.env.CALLED || "")

var method = "get_Val"
var type = "readBigNumber"

argv = argv?.original
if (Object.keys(argv).length > 2) {
  method = argv[1]
  type = argv[2]
}

console.log(`contract: ${contract_address_string}`)
console.log(`method: ${method}`)
console.log(`type: ${type}`)

async function callGetter() {
  try {
    const actionContractAddress = Address.parse(contract_address_string);
    const endpoint = await getHttpEndpoint({ network: process.env.TESTNET ? "testnet" : "mainnet" });

    const client = new TonClient({ endpoint });
    const call = await client.callGetMethod(actionContractAddress, method); // actionContractAddress from deploy
    console.log(`val value is ${eval(`call.stack.${type}().toString()`)}`);
  } catch (error) {
    console.log("[getter err]: ", error)
  }
}

callGetter();

import { beginCell, Dictionary } from "ton-core";
import { contractAddress, Cell } from "ton-core";
import { mnemonicToWalletKey } from "ton-crypto";
import { WalletContractV3R2, internal } from "ton";
import { TonClient, SendMode, Address } from "ton";
import { getHttpEndpoint } from "@orbs-network/ton-access"
import dotenv from "dotenv"

dotenv.config()

var argv = JSON.parse(process.env.npm_config_argv || "")
var contract_address = "EQBUPjE1avc6GlI8PLrglo76V9x1hsyV0mw_whKpSlmkRk2y"
var method = "get_Val"
var type = "readBigNumber"

argv = argv?.original
if (Object.keys(argv).length > 3) {
  contract_address = argv[1]
  method = argv[2]
  type = argv[3]
}

console.log(`contract: ${contract_address}`)
console.log(`method: ${method}`)
console.log(`type: ${type}`)

async function callGetter() {
  try {
    const mainContract = Address.parse(contract_address);
    const endpoint = await getHttpEndpoint({ network: process.env.TESTNET ? "testnet" : "mainnet" });

    const client = new TonClient({ endpoint });
    const call = await client.callGetMethod(mainContract, method); // mainContract from deploy
    console.log(`val value is ${eval(`call.stack.${type}().toString()`)}`);
  } catch (error) {
    console.log("[getter err]: ", error)
  }
}

callGetter();

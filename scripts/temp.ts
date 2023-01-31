// import BN from "bn.js";
// import { beginCell } from "ton-core";
// import { mnemonicToWalletKey } from "ton-crypto";
// import { WalletContractV3R2, internal } from "ton";
// import { TonClient, SendMode, Address, Builder, Cell, JettonWallet } from "ton";
// import TonWeb from "tonweb";
// import { getHttpEndpoint } from "@orbs-network/ton-access"
// import dotenv from "dotenv"

// dotenv.config()

// const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

// const mnemonic: string = process.env.DEPLOYER_MNEMONIC || ""
// const contract_address_string = "EQB3ncyBUTjZUA5EnFKR5_EnOMI9V1tTEAAPaiU71gc4TiUt"

// export function beginMessage(params: { op: number }): Builder {
//   return beginCell()
//     .storeUint(params.op, 32)
//     .storeUint((Math.floor(Math.random() * Math.pow(2, 31))), 64);
// }

// export function swap(params: { jettonAmount: number; fromAddress: Address; walletTokenBAddress: Address; toAddress: Address; expectedOutput: number; refAddress?: Address }): Cell {
//   let swapPayload = beginCell()
//     .storeUint(0x25938561, 32)
//     .storeAddress(params.walletTokenBAddress)
//     .storeCoins(params.expectedOutput)
//     .storeAddress(params.toAddress)
//     .storeBit(!!params.refAddress);

//   if (!!params.refAddress) swapPayload.storeAddress(params.refAddress || null);

//   return beginMessage({ op: 0x7362d09c })
//     .storeCoins(params.jettonAmount)
//     .storeAddress(params.fromAddress)
//     .storeBit(true)
//     .storeRef(swapPayload.endCell())
//     .endCell();
// }

// async function sendMessage(
//   client: TonClient,
//   key: any,
//   wallet: WalletContractV3R2,
// ) {
//   const actionContractAddress = Address.parse(contract_address_string);
//   const params_walletTokenBAddress = Address.parse("EQDeJgxriO9uHEBx1CzUcTlE4sy8apPGHpzlInnq82mhHsMi") // oUSDT
//   const params_toAddress = Address.parse("EQC6AepXyOwc8ywvEanTnrT_AGcRieaGOHcATq2AA1Qbzqgp")
//   const params_refAddress = false
//   const params_jettonAmount = 10000
//   const params_fromAddress = Address.parse("EQC6AepXyOwc8ywvEanTnrT_AGcRieaGOHcATq2AA1Qbzqgp") // oUSDC

//   // let swapPayload = beginCell()
//   //   .storeUint(0x25938561, 32)
//   //   .storeAddress(params_walletTokenBAddress)
//   //   .storeCoins(params_expectedOutput)
//   //   .storeAddress(params_toAddress)
//   //   .storeBit(!!params_refAddress);

//   // if (!!params_refAddress) swapPayload.storeAddress(params_refAddress || null);

//   // const messageBody = beginCell()
//   //   .storeUint(0x7362d09c, 32)
//   //   .storeUint(0x112234567890, 64)
//   //   .storeCoins(params_jettonAmount)
//   //   .storeAddress(params_fromAddress)
//   //   .storeBit(true)
//   //   .storeRef(swapPayload.endCell())
//   //   .endCell();

//   // const walletContract = client.open(wallet);
//   // const seqno = await walletContract.getSeqno();
//   // await sleep(2000)
//   // console.log(`no: ${seqno}`);

//   // const transfer = walletContract.createTransfer({
//   //   seqno,
//   //   messages: [
//   //     internal({
//   //       to: actionContractAddress.toString(),
//   //       value: '0.3',
//   //       body: messageBody
//   //     }),
//   //   ],
//   //   secretKey: key.secretKey,
//   //   sendMode: SendMode.CARRRY_ALL_REMAINING_INCOMING_VALUE,
//   // });

//   // await client.sendExternalMessage(wallet, transfer);

//   // await sleep(1000);
//   // console.log(` - Setting transaction sent successfully`);

//   // console.log(` - Waiting up to 75 seconds to check if the walletContract was actually sent..`);
//   // for (let attempt = 0; attempt < 30; attempt++) {
//   //   await sleep(2500);
//   //   const seqnoAfter = await walletContract.getSeqno();
//   //   if (seqnoAfter > seqno) break;
//   // }

//   const endpoint = await getHttpEndpoint({ network: "mainnet" });
//   const offerJetton = new TonWeb.token.ft.JettonMinter(
//     (new TonWeb.HttpProvider(endpoint)),
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     { address: 'EQDQoc5M3Bh8eWFephi9bClhevelbZZvWhkqdo80XuY_0qXv' })
//   const askJetton = new TonWeb.token.ft.JettonMinter(
//     (new TonWeb.HttpProvider(endpoint)),
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     { address: 'EQC_1YoM8RBixN95lz7odcF3Vrkc_N8Ne7gQi7Abtlet_Efi' })
//     const askJettonWalletAddress = await askJetton.getJettonWalletAddress(new TonWeb.utils.Address("EQB3ncyBUTjZUA5EnFKR5_EnOMI9V1tTEAAPaiU71gc4TiUt"));
//     const params_expectedOutput = 1
//     const offerJettonWalletAddress = await offerJetton.getJettonWalletAddress(new TonWeb.utils.Address("EQC6AepXyOwc8ywvEanTnrT_AGcRieaGOHcATq2AA1Qbzqgp"));
  
//   let swapPayload = beginCell()
//     .storeUint(0x25938561, 32)
//     .storeAddress(askJettonWalletAddress)
//     .storeCoins(params_expectedOutput)
//     .storeAddress(Address.parse("EQC6AepXyOwc8ywvEanTnrT_AGcRieaGOHcATq2AA1Qbzqgp"))
//     .storeUint(0, 1);

//   const params_inAmount = 10000
//   const params_routerAddress = Address.parse("EQC6AepXyOwc8ywvEanTnrT_AGcRieaGOHcATq2AA1Qbzqgp") // oUSDC
//   const messageBody = beginCell()
//     .storeUint(0xf8a7ea5, 32)
//     .storeUint(123456, 64)
//     .storeCoins(params_inAmount) // input amount
//     .storeAddress(params_routerAddress) // router address(toAddress of input token)
//     // .storeAddress()
//     .storeBit(false)
//     .storeCoins(265000000) // swapForward gas amount
//     .storeBit(true)
//     .storeRef(swapPayload.endCell())
//     .endCell();
// }

// async function main() {
//   try {
//     const endpoint = await getHttpEndpoint({ network: "mainnet" });
//     const client = new TonClient({ endpoint });
//     const key = await mnemonicToWalletKey(mnemonic.split(" "));
//     const wallet = WalletContractV3R2.create({
//       publicKey: key.publicKey,
//       workchain: 0,
//     });
//     const offerJetton = new TonWeb.token.ft.JettonMinter(
//       (new TonWeb.HttpProvider(endpoint)),
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       { address: 'EQDQoc5M3Bh8eWFephi9bClhevelbZZvWhkqdo80XuY_0qXv' })
//     const askJetton = new TonWeb.token.ft.JettonMinter(
//       (new TonWeb.HttpProvider(endpoint)),
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       { address: 'EQC_1YoM8RBixN95lz7odcF3Vrkc_N8Ne7gQi7Abtlet_Efi' })
//     const offerJettonWalletAddress = await offerJetton.getJettonWalletAddress(new TonWeb.utils.Address("EQC6AepXyOwc8ywvEanTnrT_AGcRieaGOHcATq2AA1Qbzqgp"));
//     const askJettonWalletAddress = await askJetton.getJettonWalletAddress(new TonWeb.utils.Address("EQB3ncyBUTjZUA5EnFKR5_EnOMI9V1tTEAAPaiU71gc4TiUt"));
//     console.log("offerJettonWalletAddress: ", offerJettonWalletAddress.toString())
//     const params_toAddress = Address.parse("EQC6AepXyOwc8ywvEanTnrT_AGcRieaGOHcATq2AA1Qbzqgp")
//     console.log("params_toAddress: ", params_toAddress)
//     console.log("params_toAddress: ", new TonWeb.utils.Address("EQC6AepXyOwc8ywvEanTnrT_AGcRieaGOHcATq2AA1Qbzqgp").toString())


//     // console.log(`contract_address_string: ${contract_address_string}`)
//     // console.log(`wallet addess: ${wallet.address}`);

//     // await sendMessage(client, key, wallet);
//     wallet.methods.transfer({
//       secretKey: new TextEncoder().encode(WALLET_SECRET),
//       toAddress: params.to,
//       amount: params.gasAmount,
//       seqno: (await wallet.methods.seqno().call()) ?? 0,
//       payload: params.payload,
//       sendMode: 3,
//     });
//   } catch (error) {
//     console.log("[sendmsg err]: ", error)
//   }
// }

// main();

// import BN from "bn.js";
// import { beginCell } from "ton-core";
// import { mnemonicToWalletKey } from "ton-crypto";
// import { WalletContractV3R2, internal } from "ton";
// import { TonClient, SendMode, Address, Builder, Cell, JettonWallet, JettonMaster } from "ton";
// import { getHttpEndpoint } from "@orbs-network/ton-access"
// import dotenv from "dotenv"

// dotenv.config()

// const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

// // swap USDC -> USDT
// const mnemonic: string = process.env.DEPLOYER_MNEMONIC || ""

// async function main() {
//   try {
//     const endpoint = await getHttpEndpoint({ network: "mainnet" });
//     const client = new TonClient({ endpoint });
//     const key = await mnemonicToWalletKey(mnemonic.split(" "));
//     const wallet = WalletContractV3R2.create({
//       publicKey: key.publicKey,
//       workchain: 0,
//     });
//     const msgToAddress = Address.parse("EQCs0JPvNso0JGR2sx4dPH5O4sEsQzlhvS7p-H8Al-RysbCY") // jetton wallet of in token of user wallet

//     const swapPayload = beginCell()
//       .storeUint(0x25938561, 32)
//       .storeAddress(Address.parse("EQAIBnMGyR4vXuaF3OzR80LIZ2Z_pe3z-_t_q6Blu2HKLeaY")) // jetton wallet of out token of router
//       .storeCoins(100000) // min_output
//       .storeAddress(Address.parse("EQC6AepXyOwc8ywvEanTnrT_AGcRieaGOHcATq2AA1Qbzqgp")) // guess to address
//       .storeBit(false);

//     const messageBody = beginCell()
//       .storeUint(0xf8a7ea5, 32) // 0x7362d09c
//       .storeUint(12345, 64)
//       .storeCoins(100000) // input amount
//       .storeAddress(Address.parse("EQB3ncyBUTjZUA5EnFKR5_EnOMI9V1tTEAAPaiU71gc4TiUt")) // router address(toAddress of input token)
//       // .storeAddress()
//       // .storeBit(false)
//       // .storeCoins(265000000) // swapForward gas amount
//       .storeBit(true)
//       .storeRef(swapPayload.endCell())
//       .endCell();

//     const walletContract = client.open(wallet);
//     const seqno = await walletContract.getSeqno();
//     await sleep(2000)
//     console.log(`no: ${seqno}`);

//     const transfer = walletContract.createTransfer({
//       seqno,
//       messages: [
//         internal({
//           to: msgToAddress.toString(),
//           value: '0.3',
//           bounce: false,
//           body: messageBody
//         }),
//       ],
//       secretKey: key.secretKey,
//       sendMode: SendMode.PAY_GAS_SEPARATLY + SendMode.IGNORE_ERRORS,
//     });

//     await client.sendExternalMessage(wallet, transfer);

//     await sleep(1000);
//     console.log(` - Setting transaction sent successfully`);

//     console.log(` - Waiting up to 75 seconds to check if the walletContract was actually sent..`);
//     for (let attempt = 0; attempt < 30; attempt++) {
//       await sleep(2500);
//       const seqnoAfter = await walletContract.getSeqno();
//       if (seqnoAfter > seqno) break;
//     }
//   } catch (error) {
//     console.log("[sendmsg err]: ", error)
//   }
// }

// main();

// import TonWeb, {
//   ContractOptions as TW_ContractOptions,
//   JettonMinterOptions as TW_JettonMinterOptions,
// } from 'tonweb';
// import { mnemonicToWalletKey } from "ton-crypto";

// const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

// type Address = InstanceType<typeof TonWeb.utils.Address>;
// type Cell = InstanceType<typeof TonWeb.boc.Cell>;
// // type BitString = InstanceType<typeof TonWeb.boc.BitString>;
// // type Contract = InstanceType<typeof TonWeb.Contract>;
// // type HttpProvider = InstanceType<typeof TonWeb.HttpProvider>;
// // type JettonMinter = InstanceType<typeof TonWeb.token.ft.JettonMinter>;
// // type JettonWallet = InstanceType<typeof TonWeb.token.ft.JettonWallet>;
// type BN = InstanceType<typeof TonWeb.utils.BN>;
// // type AddressType = string | Address;
// // interface ContractOptions extends TW_ContractOptions {}
// // interface JettonMinterOptions extends TW_JettonMinterOptions {}

// const OP_CODES = {
//   ADD_LIQUIDITY: 0x7362d09c,
//   SWAP: 0x25938561,
//   PROVIDE_LIQUIDITY: 0xfcf9e58f,
//   DIRECT_ADD_LIQUIDITY: 0x4cf82803,
//   REFUND: 0x0bf3f447,
//   RESET_GAS: 0x42a0fb43,
//   COLLECT_FEES: 0x1fcb7d3d,
//   REQUEST_TRANSFER: 0xf8a7ea5,
//   REQUEST_BURN: 0x595f07bc,
// }

// const ROUTER = 'EQB3ncyBUTjZUA5EnFKR5_EnOMI9V1tTEAAPaiU71gc4TiUt'
// const WALLET_ADDRESS = 'EQC6AepXyOwc8ywvEanTnrT_AGcRieaGOHcATq2AA1Qbzqgp' // YOUR WALLET ADDRESS HERE
// const WALLET_SECRET = process.env.DEPLOYER_MNEMONIC || "" // YOUR WALLET SECRET HERE

// function createJettonTransferMessage(params: {
//   toAddress: Address | string;
//   jettonAmount: BN;
//   payload: Cell;
//   gasAmount: BN;
//   queryId?: BN;
// }) {
//   const message = new TonWeb.boc.Cell();

//   message.bits.writeUint(OP_CODES.REQUEST_TRANSFER, 32);
//   message.bits.writeUint(params.queryId ?? 0, 64);
//   message.bits.writeCoins(params.jettonAmount);
//   message.bits.writeAddress(new TonWeb.utils.Address(params.toAddress));
//   message.bits.writeCoins(params.gasAmount);
//   message.bits.writeBit(true);

//   message.refs[0] = params.payload;

//   return message;
// }

// const createSwapBody = async (
//   params: {
//     userWalletAddress: string | Address;
//     offerAmount: BN;
//     minAskAmount: BN;
//     askJettonWalletAddress: string | Address;
//     forwardGasAmount?: BN;
//     queryId?: BN;
//   },
// ) => {
//   const payload = new TonWeb.boc.Cell();

//   payload.bits.writeUint(OP_CODES.SWAP, 32);
//   payload.bits.writeAddress(new TonWeb.utils.Address(params.askJettonWalletAddress));
//   payload.bits.writeCoins(params.minAskAmount);
//   payload.bits.writeAddress(new TonWeb.utils.Address(params.userWalletAddress));
//   payload.bits.writeUint(0, 1);

//   return createJettonTransferMessage({
//     toAddress: new TonWeb.utils.Address(ROUTER),
//     jettonAmount: params.offerAmount,
//     payload: payload,
//     gasAmount: params?.forwardGasAmount ?? new TonWeb.utils.BN(265000000),
//     queryId: params.queryId,
//   });
// };

// const main = async () => {
//   try {
//     await sleep(2000)
//     const key = await mnemonicToWalletKey(WALLET_SECRET.split(" "));
//     await sleep(2000)
//     const provider = new TonWeb.HttpProvider();
//     const wallet = new TonWeb(provider).wallet.create({
//       address: WALLET_ADDRESS,
//     });

//     const jetton0 = new TonWeb.token.jetton.JettonMinter(
//       provider,
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       {
//         address: 'EQDQoc5M3Bh8eWFephi9bClhevelbZZvWhkqdo80XuY_0qXv', // WTON
//       },
//     );

//     const jetton1 = new TonWeb.token.jetton.JettonMinter(
//       provider,
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       {
//         address: 'EQC_1YoM8RBixN95lz7odcF3Vrkc_N8Ne7gQi7Abtlet_Efi', // oUSDT
//       },
//     );

//     const userRedJettonWalletAddress =
//       await jetton0.getJettonWalletAddress(new TonWeb.Address(WALLET_ADDRESS));
//     await sleep(2000)
//     const routerMoonJettonWalletAddress =
//       await jetton1.getJettonWalletAddress(new TonWeb.Address(ROUTER));
//     await sleep(2000)

//     const payload = await createSwapBody({
//       userWalletAddress: WALLET_ADDRESS,
//       offerAmount: new TonWeb.utils.BN(0.05),
//       minAskAmount: new TonWeb.utils.BN(0.01),
//       askJettonWalletAddress: userRedJettonWalletAddress,
//       forwardGasAmount: new TonWeb.utils.BN(0.1),
//       queryId: new TonWeb.utils.BN(12345),
//     });

//     const gasAmount = new TonWeb.utils.BN(0.3);
//     await sleep(2000)
//     const seqno = await wallet.methods.seqno().call();
//     await sleep(2000)
//     console.log(`no: ${seqno}`);

//     const transfer = wallet.methods.transfer({
//       // secretKey: new TextEncoder().encode(WALLET_SECRET),
//       secretKey: key.secretKey,
//       toAddress: routerMoonJettonWalletAddress,
//       amount: gasAmount,
//       seqno: seqno ?? 0,
//       payload: payload,
//       sendMode: 3
//     });

//     const send = await transfer.send();
//     console.log("send: ", send)

//     await sleep(1000);
//     console.log(` - Setting transaction sent successfully`);

//     console.log(` - Waiting up to 75 seconds to check if the walletContract was actually sent..`);
//     for (let attempt = 0; attempt < 30; attempt++) {
//       await sleep(2500);
//       const seqnoAfter = await wallet.methods.seqno().call();
//       console.log(`attempt: ${attempt}, seqnoAfter: ${seqnoAfter}, seqno: ${seqno}`);
//       if (seqnoAfter !== undefined && seqno !== undefined && (seqnoAfter > seqno)) break;
//     }
//   } catch (error) {
//     console.log("err: ", error)
//   }
// };

// main();

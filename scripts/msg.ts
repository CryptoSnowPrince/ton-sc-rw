import TonWeb from 'tonweb';

async () => {
  const WALLET_ADDRESS = 'EQC6AepXyOwc8ywvEanTnrT_AGcRieaGOHcATq2AA1Qbzqgp' // YOUR WALLET ADDRESS HERE
  const WALLET_SECRET = process.env.DEPLOYER_MNEMONIC || "" // YOUR WALLET SECRET HERE

  const provider = new TonWeb.HttpProvider();

  const wallet = new TonWeb(provider).wallet.create({
    address: WALLET_ADDRESS,
  });

  // Create transaction params for swap operation
  // 0.5 JETTON0 to JETTON1 but not less than 0.1 JETTON1
  const params = await router.buildSwapTxParams({
    userWalletAddress: WALLET_ADDRESS,
    offerJettonAddress: 'EQDQoc5M3Bh8eWFephi9bClhevelbZZvWhkqdo80XuY_0qXv', // JETTON0
    askJettonAddress: 'EQC_1YoM8RBixN95lz7odcF3Vrkc_N8Ne7gQi7Abtlet_Efi', // JETTON1
    offerAmount: TonWeb.utils.toNano('0.5'),
    minAskAmount: TonWeb.utils.toNano('0.1'),
    queryId: new TonWeb.utils.BN(12345),
  });

  wallet.methods.transfer({
    secretKey: new TextEncoder().encode(WALLET_SECRET),
    toAddress: params.to,
    amount: params.gasAmount,
    seqno: (await wallet.methods.seqno().call()) ?? 0,
    payload: params.payload,
    sendMode: 3,
  });
};

import * as ethers from "ethers";
import axios from "axios";

const provider = ethers.getDefaultProvider("https://1rpc.io/eth");
const blockPerApiRequest = 1000000;

const getCovalentApiUrl = (
  walletAddr,
  contractAddr,
  networkId,
  startBlock,
  endBlock
) => {
  const covalentApiRootUrl = "https://api.covalenthq.com/v1";
  const pageSize = 100000;
  const apiKey = "ckey_1126a2694d9f44618db5620be76";

  return `${covalentApiRootUrl}/${networkId}/address/${walletAddr}/transfers_v2/?starting-block=${startBlock}&ending-block=${endBlock}&page-size=${pageSize}&contract-address=${contractAddr}&key=${apiKey}`;
};

const trackEvents = async ({ walletAddr, tokenAddr }) => {
  const startBlock = 9817990; // mainnet
  const endBlock = await provider.getBlockNumber();
  const networkId = "1";

  // track "Transfer" events logs
  let block = startBlock;
  let logs = [];

  try {
    while (block < endBlock) {
      try {
        const covalanetApiUrl = getCovalentApiUrl(
          walletAddr,
          tokenAddr,
          networkId,
          block,
          block + blockPerApiRequest
        );
        const res = await axios.get(covalanetApiUrl);
        logs = [...logs, ...res.data.data.items];
      } catch (err) {
        console.log("Error: ", err);
      }
      block += blockPerApiRequest;
    }
  } catch (err) {
    console.log("covanlent API fetch error: --->", err);
  }

  // get "Transfer" Events
  const transferEvents = logs.map((log) => {
    const transferTx = log.transfers[0];
    return {
      from: transferTx.from_address,
      to: transferTx.to_address,
      amount: ethers.utils.formatUnits(
        transferTx.delta,
        transferTx.contract_decimals
      ),
      txHash: log.tx_hash,
    };
  });

  return transferEvents;
};

export { trackEvents };

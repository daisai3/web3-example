import { GraphQLClient } from "graphql-request";
import { PAIR_HOUR_DATA_SEARCH } from "./queries";

const uniswapV2Client = new GraphQLClient(
  "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
);

const getPairHourData = async ({ pairAddr, hourStart }) => {
  if (!pairAddr) return [];
  const { pairHourDatas } = await uniswapV2Client.request(
    PAIR_HOUR_DATA_SEARCH({ pairAddr: pairAddr.toLowerCase(), hourStart })
  );
  return pairHourDatas;
};

export { getPairHourData };

import gql from "graphql-tag";

export const PAIR_HOUR_DATA_SEARCH = ({ pairAddr, hourStart }) => {
  const queryString = `
    query pairHourDatas {
      pairHourDatas(
        first: 1000,
        orderBy: hourStartUnix,
        orderDirection: asc
        where: {
            ${pairAddr ? `pair: "${pairAddr}"` : ``}
            ${hourStart ? `hourStartUnix_gt: ${hourStart}` : ``}
        }
      )
      {
        id
        hourStartUnix
        reserve0
        reserve1
        reserveUSD
        hourlyVolumeToken0
        hourlyVolumeToken1
        hourlyVolumeUSD
        hourlyTxns
      }
    }`;
  return gql(queryString);
};

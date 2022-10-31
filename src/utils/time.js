import moment from "moment";

export const formatTimestampToUtc = (timestamp) => {
  return moment.utc(timestamp * 1000).format("YYYY/MM/DD HH:mm:ss");
};

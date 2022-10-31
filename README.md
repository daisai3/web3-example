# Web3 examples

## Get ERC20 transfers

There are number of solutions to get ERC20 transfers and the best solutions are to get transfers from covalent, moralis or subgraph. In this example, we use covalanet API to get ERC20 token transfers from user wallet and token address.

API url format: `https://api.covalenthq.com/v1/${networkId}/address/${walletAddr}/transfers_v2/?contract-address=${contractAddr}&key=${apiKey}`

## Fetch LP pair data from The Graph

Given a unix timestamp, we fetch every `PairHourData` record for the DAI/ETH pair from the UniswapV2 Subgraph after the given timestamp.

The Graph can only return maximum of 1000 items at a time, so your script must handle fetching more than 1000 records. So in this example, we use `hourStartUnix_gt` filter query to get 1000+ records.

## On-chain event notifications architecture

1. Smart contract
   We need to have a mapping variable to get email address from wallet address.
   `mapping(address=>String) addressToEmail`;

2. Backend system

- We can token transfer events using websocker web3 provider.
- We can get `to` address from transfer events.
- We can get matched `email` address by calling on-chain storage `addressToEmail` we defined in the above.
- We can choose some mail services(nodemailer, twilio sendgrid, etc) for mail notifictions.

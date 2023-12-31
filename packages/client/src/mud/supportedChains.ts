import { MUDChain, latticeTestnet, mudFoundry } from "@latticexyz/common/chains";
import { sepolia, goerli } from 'viem/chains'

goerli.rpcUrls.default.http = ['https://goerli.infura.io/v3/5ca372516740427e97512d4dfefd9c47']
goerli.rpcUrls.default.webSocket = [ 'wss://goerli.infura.io/ws/v3/5ca372516740427e97512d4dfefd9c47' ]

// If you are deploying to chains other than anvil or Lattice testnet, add them here
export const supportedChains: MUDChain[] = [mudFoundry, latticeTestnet, sepolia, goerli];

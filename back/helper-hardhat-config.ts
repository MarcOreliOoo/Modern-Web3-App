import dotenv from 'dotenv';
dotenv.config({path:"../.env"});

export type Network = EthereumNetwork | PolygonNetwork | XDaiNetwork;

export enum EthereumNetwork {
  kovan = 'kovan',
  goerli = 'goerli',
  rinkeby = 'rinkeby',
  main = 'main',
  hardhat = 'hardhat',
  tenderlyMain = 'tenderlyMain',
  harhatevm = 'harhatevm',
}

export enum PolygonNetwork {
  main = 'polygon-mainnet',
  mumbai = 'mumbai',
}

export enum XDaiNetwork {
  xdai = 'xdai',
}

export type ParamsPerNetwork<T> =
  | EthereumParamsPerNetwork<T>
  | PolygonParamsPerNetwork<T>
  | XDaiParamsPerNetwork<T>;

export interface EthereumParamsPerNetwork<Network> {
  [EthereumNetwork.harhatevm]: Network;
  [EthereumNetwork.rinkeby]: Network;
  [EthereumNetwork.main]: Network;
  [EthereumNetwork.hardhat]: Network;
  [EthereumNetwork.tenderlyMain]: Network;
  [EthereumNetwork.goerli]: Network;
}

export interface PolygonParamsPerNetwork<Network> {
  [PolygonNetwork.main]: Network;
  [PolygonNetwork.mumbai]: Network;
}

export interface XDaiParamsPerNetwork<Network> {
  [XDaiNetwork.xdai]: Network;
}

export interface ObjectString {
  [key: string]: string;
}
export const alchemyUrlOrEnvVar = (defaultAlchemyUrl: string, rpcUrl?: string): string => {
  const defaultUrl = `${defaultAlchemyUrl}/${process.env.ALCHEMY_KEY}`;
  return rpcUrl ? rpcUrl : defaultUrl;
};

export const NETWORKS_RPC_URL: ParamsPerNetwork<string> = {
  [EthereumNetwork.rinkeby]: alchemyUrlOrEnvVar(
    'https://eth-rinkeby.alchemyapi.io/v2',
    process.env.RINKEBY_RPC_URL
  ),
  [EthereumNetwork.main]: alchemyUrlOrEnvVar(
    'https://eth-mainnet.alchemyapi.io/v2',
    process.env.MAINNET_RPC_URL
  ),
  [EthereumNetwork.goerli]: alchemyUrlOrEnvVar(
    'https://eth-goerli.g.alchemy.com/v2',
    process.env.MAINNET_RPC_URL
  ),
  [EthereumNetwork.hardhat]: 'http://localhost:8545',
  [PolygonNetwork.mumbai]: alchemyUrlOrEnvVar(
    'https://polygon-mumbai.g.alchemy.com/v2',
    process.env.MUMBAI_RPC_URL
  ),
  [PolygonNetwork.main]: alchemyUrlOrEnvVar(
    'https://polygon-mainnet.g.alchemy.com/v2',
    process.env.POLYGON_RPC_URL
  ),
  [XDaiNetwork.xdai]: 'https://rpc.xdaichain.com/',
};
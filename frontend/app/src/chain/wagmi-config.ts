import { createConfig, type CreateConnectorFn, http } from '@wagmi/vue';
import { injected, walletConnect } from '@wagmi/vue/connectors';
import { ROBINHOOD_RPC, robinhoodChain } from '@/chain/robinhood-chain';

const walletConnectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
const canUseWalletConnect = typeof walletConnectId === 'string'
  && walletConnectId.length >= 32
  && !walletConnectId.includes('placeholder');

const connectors: CreateConnectorFn[] = [
  injected({ target: 'metaMask' }),
  injected(),
];

if (canUseWalletConnect)
  connectors.push(walletConnect({ projectId: walletConnectId }));

export const wagmiConfig = createConfig({
  chains: [robinhoodChain],
  connectors,
  transports: {
    [robinhoodChain.id]: http(ROBINHOOD_RPC),
  },
});

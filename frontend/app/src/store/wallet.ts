import type { ComputedRef, Ref } from 'vue';
import { type Connector, useAccount, useBalance, useChainId, useConnect, useDisconnect, useSwitchChain } from '@wagmi/vue';
import { defineStore } from 'pinia';
import { formatEther } from 'viem';
import { robinhoodChain } from '@/chain/robinhood-chain';

interface HoodWalletStore {
  address: Ref<`0x${string}` | undefined>;
  chainId: Ref<number>;
  connect: (args: { connector: Connector }) => void;
  connectError: ComputedRef<{ message: string } | null>;
  connectMetaMask: () => void;
  connectors: ComputedRef<Connector[]>;
  disconnect: () => void;
  ethBalance: ComputedRef<string>;
  isConnected: Ref<boolean>;
  isConnecting: Ref<boolean>;
  isOnRobinhoodChain: ComputedRef<boolean>;
  isSwitching: Ref<boolean>;
  resetConnect: () => void;
  shortAddress: ComputedRef<string>;
  status: Ref<string>;
  switchToRobinhood: () => void;
}

export const useWalletStore = defineStore('hoodfolio/wallet', (): HoodWalletStore => {
  const { address, isConnected, status } = useAccount();
  const { connect: connectWallet, connectors, error: connectErrorRaw, isPending: isConnecting, reset: resetConnect } = useConnect();
  const { disconnect: disconnectWallet } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const chainId = useChainId();
  const { data: balance } = useBalance({
    address,
    query: {
      enabled: computed(() => Boolean(address.value)),
    },
  });

  const isOnRobinhoodChain = computed(() => chainId.value === robinhoodChain.id);

  const shortAddress = computed(() => {
    if (!address.value)
      return '';
    return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`;
  });

  const ethBalance = computed(() => {
    if (!balance.value)
      return '0 ETH';
    return `${Number.parseFloat(formatEther(balance.value.value)).toFixed(4)} ETH`;
  });

  const connectorList = computed(() => {
    const list = unref(connectors);
    return Array.isArray(list) ? list : [];
  });

  const connectError = computed(() => {
    const err = connectErrorRaw.value;
    return err ? { message: err.message } : null;
  });

  function connect(args: { connector: Connector }): void {
    connectWallet({ connector: args.connector });
  }

  function connectMetaMask(): void {
    const metamaskConnector = connectorList.value.find(item =>
      item.name === 'MetaMask' || item.id === 'metaMask' || item.id.includes('metaMask'),
    );
    const fallback = metamaskConnector ?? connectorList.value[0];
    if (fallback)
      connect({ connector: fallback });
  }

  function disconnect(): void {
    disconnectWallet();
  }

  function switchToRobinhood(): void {
    switchChain({ chainId: robinhoodChain.id });
  }

  return {
    address,
    chainId,
    connect,
    connectError,
    connectMetaMask,
    connectors: connectorList,
    disconnect,
    ethBalance,
    isConnected,
    isConnecting,
    isOnRobinhoodChain,
    isSwitching,
    resetConnect,
    shortAddress,
    status,
    switchToRobinhood,
  };
});

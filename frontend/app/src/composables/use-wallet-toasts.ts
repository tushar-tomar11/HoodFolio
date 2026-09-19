import { useToast } from '@/composables/use-toast';
import { useWalletStore } from '@/store/wallet';

export function useWalletToasts(): void {
  const wallet = useWalletStore();
  const toast = useToast();

  watch(
    () => [wallet.isConnected, wallet.isOnRobinhoodChain] as const,
    ([connected, onChain], previous) => {
      const wasConnected = previous?.[0];
      if (connected && !wasConnected)
        toast.show('✅ Connected to Robinhood Chain', 'success');
      else if (!connected && wasConnected)
        toast.show('Wallet disconnected', 'info');

      if (connected && !onChain)
        toast.show('⚠️ Please switch to Robinhood Chain (ID: 4663)', 'error');
    },
  );
}

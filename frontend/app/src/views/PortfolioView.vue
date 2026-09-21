<script setup lang="ts">
import { ROBINHOOD_EXPLORER, STOCK_TOKENS, UNISWAP_HOME } from '@/chain/robinhood-chain';
import HfButton from '@/components/hf/HfButton.vue';
import HfSkeleton from '@/components/hf/HfSkeleton.vue';
import HfStatusCard from '@/components/hf/HfStatusCard.vue';
import PortfolioHeader from '@/components/portfolio/PortfolioHeader.vue';
import StockHoldings from '@/components/portfolio/StockHoldings.vue';
import WalletModal from '@/components/wallet/WalletModal.vue';
import { usePageMeta } from '@/composables/use-page-meta';
import { usePortfolioPage } from '@/composables/use-portfolio-page';
import { useToast } from '@/composables/use-toast';
import { STEAKHOUSE_USDG_APP_URL } from '@/services/morpho';
import { usePriceStore } from '@/store/prices';
import { useWalletStore } from '@/store/wallet';
import { formatPercent, formatTokenAmount } from '@/utils/formatting';

usePageMeta(
  'My Portfolio | HoodFolio',
  'Track Robinhood Chain stock tokens and USDG from your wallet.',
);

const nvda = STOCK_TOKENS.NVDA;
const NVDA_TRADE = nvda
  ? `https://app.uniswap.org/swap?outputCurrency=${nvda.address}&chain=robinhood`
  : UNISWAP_HOME;
const BRIDGE_ETH = 'https://bridge.arbitrum.io';

const wallet = useWalletStore();
const toast = useToast();
const {
  address,
  emptyKind,
  error,
  ethBalanceWei,
  hasFetched,
  isLoading,
  lastUpdated,
  refresh,
  stockHoldings,
  totalValueUSD,
  usdgBalance,
  usdgFormatted,
} = usePortfolioPage();
const prices = usePriceStore();
const modalOpen = ref(false);

const morphoYieldHint = computed(() => {
  if (Number.isFinite(prices.morphoApyPct))
    return `Steakhouse USDG on Morpho currently shows ${formatPercent(prices.morphoApyPct, false)} net APY (Morpho, excl. rewards).`;
  return 'Deposit USDG into Morpho’s Steakhouse vault on Robinhood Chain. APY is shown only when Morpho’s API responds.';
});

function openModal(): void {
  modalOpen.value = true;
}

async function onRefresh(): Promise<void> {
  await refresh();
  toast.show('↻ Portfolio refreshed', 'info');
}

const showLoading = computed(() => wallet.isConnected && (isLoading.value || !hasFetched.value));
const blockscoutHref = computed(() =>
  address.value ? `${ROBINHOOD_EXPLORER}/address/${address.value}` : ROBINHOOD_EXPLORER,
);
const ethFormatted = computed(() => formatTokenAmount(ethBalanceWei.value, 18));
</script>

<template>
  <div class="pf">
    <template v-if="!wallet.isConnected">
      <div
        class="pf-gate"
        data-testid="connect-prompt"
      >
        <p class="pf-gate__lock">
          📊
        </p>
        <h1 class="pf-gate__h">
          Connect your wallet to see your real portfolio
        </h1>
        <p class="pf-gate__p">
          HoodFolio reads directly from Robinhood Chain — nothing is stored.
        </p>
        <HfButton
          variant="primary"
          size="lg"
          @click="openModal()"
        >
          Connect Wallet
        </HfButton>
      </div>
    </template>

    <template v-else>
      <div
        v-if="showLoading"
        class="pf-load"
      >
        <p class="pf-load__t">
          Fetching your balances from Robinhood Chain...
        </p>
        <HfSkeleton
          height="42px"
          width="240px"
        />
        <HfSkeleton
          height="18px"
          width="180px"
        />
        <HfSkeleton height="220px" />
      </div>

      <HfStatusCard
        v-else-if="error"
        title="Couldn't load balances"
        :body="error"
        action-label="Retry"
        @action="onRefresh()"
      />

      <template v-else-if="stockHoldings.length > 0">
        <HfButton
          variant="ghost"
          size="sm"
          @click="onRefresh()"
        >
          Refresh
        </HfButton>
        <PortfolioHeader
          data-testid="portfolio-header"
          :total-value-usd="totalValueUSD"
          :address="address"
          :last-updated="lastUpdated"
          :stock-count="stockHoldings.length"
          :usdg-balance="usdgFormatted"
        />
        <StockHoldings :holdings="stockHoldings" />
        <section class="pf-other card">
          <h2 class="pf-other__h">
            Other tokens
          </h2>
          <p class="num">
            ETH {{ ethFormatted }}
          </p>
          <p
            v-if="usdgBalance > 0"
            class="num"
          >
            USDG {{ usdgFormatted }}
          </p>
          <p class="pf-other__p">
            Meme coin tracking coming soon. To see your full token list, view this wallet on Blockscout:
          </p>
          <a
            class="pf-other__a"
            :href="blockscoutHref"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Blockscout ↗
          </a>
        </section>
        <section class="pf-other card">
          <h2 class="pf-other__h">
            USDG
          </h2>
          <p>
            USDG Balance: {{ usdgFormatted }} USDG
          </p>
          <p class="pf-other__p">
            {{ morphoYieldHint }}
          </p>
          <a
            class="pf-other__a"
            :href="STEAKHOUSE_USDG_APP_URL"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Steakhouse USDG on Morpho ↗
          </a>
          <p class="pf-note">
            Balance read live from Chain 4663 via viem multicall.
          </p>
        </section>
      </template>

      <div
        v-else
        class="pf-empty"
        data-testid="empty-portfolio"
      >
        <template v-if="emptyKind === 'eth'">
          <p class="pf-empty__t">
            You have ETH but no stock tokens yet.
          </p>
          <p class="num pf-empty__eth">
            {{ wallet.ethBalance }}
          </p>
          <a
            class="pf-empty__a"
            :href="NVDA_TRADE"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy NVDA, TSLA, or AAPL on Uniswap →
          </a>
        </template>
        <template v-else>
          <p class="pf-empty__t">
            This wallet has no tokens on Robinhood Chain.
          </p>
          <p class="pf-empty__p">
            Bridge ETH from Ethereum → then swap for stock tokens on Uniswap.
          </p>
          <div class="pf-empty__btns">
            <a
              class="pf-empty__a"
              :href="BRIDGE_ETH"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bridge ETH
            </a>
            <a
              class="pf-empty__a"
              :href="UNISWAP_HOME"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Uniswap
            </a>
          </div>
        </template>
      </div>
    </template>

    <WalletModal
      v-model:open="modalOpen"
    />
  </div>
</template>

<style scoped>
.pf {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 16px 64px;
}

.pf-gate {
  min-height: 56vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 16px;
}

.pf-gate__lock {
  font-size: 56px;
  margin-bottom: 16px;
}

.pf-gate__h {
  font-family: var(--font-ui);
  font-size: 28px;
  font-weight: 700;
  color: var(--hf-ink);
  max-width: 520px;
  margin-bottom: 12px;
}

.pf-gate__p {
  max-width: 440px;
  font-size: 15px;
  color: var(--hf-ink-3);
  margin-bottom: 24px;
  line-height: 1.55;
}

.pf-load {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pf-load__t {
  color: var(--hf-ink-3);
  margin-bottom: 8px;
}

.pf-empty {
  margin-top: 32px;
  text-align: center;
}

.pf-empty__t {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 8px;
}

.pf-empty__p {
  color: var(--hf-ink-3);
  margin-bottom: 16px;
}

.pf-empty__eth {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
}

.pf-empty__a {
  display: inline-block;
  color: var(--hf-green);
  font-weight: 600;
  text-decoration: none;
  margin: 0 8px 12px;
}

.pf-empty__btns {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.pf-other {
  padding: 18px 20px;
  margin-bottom: 16px;
}

.pf-other__h {
  font-family: var(--font-ui);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.pf-other__p {
  color: var(--hf-ink-3);
  margin: 8px 0;
}

.pf-other__a {
  color: var(--hf-green);
  font-weight: 600;
  text-decoration: none;
}

.pf-note {
  background: var(--hf-amber-bg);
  color: var(--hf-amber-text);
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13px;
  margin-top: 12px;
}
</style>

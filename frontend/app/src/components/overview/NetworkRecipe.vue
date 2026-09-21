<script setup lang="ts">
import { NETWORK_RECIPE } from '@/chain/home-content';
import HfButton from '@/components/hf/HfButton.vue';
import { useWalletStore } from '@/store/wallet';

const emit = defineEmits<{
  connect: [];
}>();

const wallet = useWalletStore();
const copied = shallowRef(false);

function onCopyRpc(): void {
  navigator.clipboard.writeText(NETWORK_RECIPE.rpc).then(() => {
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1600);
  }).catch(() => undefined);
}
</script>

<template>
  <section
    class="recipe card"
    aria-label="Robinhood Chain network details"
  >
    <h2 class="recipe__h">
      Add the network, then connect
    </h2>
    <p class="recipe__s">
      HoodFolio only reads chain {{ NETWORK_RECIPE.chainId }}. No fake portfolio numbers until a wallet is connected.
    </p>
    <dl class="recipe__dl">
      <div>
        <dt>Network</dt>
        <dd>{{ NETWORK_RECIPE.name }}</dd>
      </div>
      <div>
        <dt>Chain ID</dt>
        <dd class="num">
          {{ NETWORK_RECIPE.chainId }}
        </dd>
      </div>
      <div>
        <dt>Currency</dt>
        <dd>{{ NETWORK_RECIPE.currency }}</dd>
      </div>
      <div class="recipe__rpc">
        <dt>RPC</dt>
        <dd>
          <button
            type="button"
            class="recipe__copy"
            @click="onCopyRpc()"
          >
            {{ copied ? 'Copied' : NETWORK_RECIPE.rpc }}
          </button>
        </dd>
      </div>
    </dl>
    <div class="recipe__actions">
      <HfButton
        variant="primary"
        size="md"
        :loading="wallet.isSwitching"
        @click="wallet.switchToRobinhood()"
      >
        Add / switch to Robinhood Chain
      </HfButton>
      <HfButton
        variant="secondary"
        size="md"
        @click="emit('connect')"
      >
        Connect Wallet
      </HfButton>
    </div>
    <p class="recipe__links">
      <a
        :href="NETWORK_RECIPE.explorer"
        target="_blank"
        rel="noopener noreferrer"
      >
        Blockscout ↗
      </a>
      <a
        :href="NETWORK_RECIPE.uniswap"
        target="_blank"
        rel="noopener noreferrer"
      >
        Uniswap ↗
      </a>
      <a
        :href="NETWORK_RECIPE.morpho"
        target="_blank"
        rel="noopener noreferrer"
      >
        Morpho ↗
      </a>
    </p>
  </section>
</template>

<style scoped>
.recipe {
  padding: 24px 20px;
  margin-bottom: 56px;
}

.recipe__h {
  font-family: var(--font-ui);
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
}

.recipe__s {
  font-size: 14px;
  line-height: 1.5;
  color: var(--hf-ink-3);
  margin-bottom: 16px;
}

.recipe__dl {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-bottom: 18px;
}

.recipe__dl dt {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--hf-ink-4);
}

.recipe__dl dd {
  margin: 2px 0 0;
  font-size: 14px;
  overflow-wrap: anywhere;
}

.recipe__copy {
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--hf-ink);
  font: inherit;
  cursor: pointer;
  text-align: left;
}

.recipe__copy:hover { color: var(--hf-green); }

.recipe__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}

.recipe__links {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 14px;
}

.recipe__links a {
  color: var(--hf-green);
  text-decoration: none;
  font-weight: 600;
}

@media (min-width: 700px) {
  .recipe__dl {
    grid-template-columns: 1fr 1fr;
  }

  .recipe__rpc {
    grid-column: 1 / -1;
  }
}
</style>

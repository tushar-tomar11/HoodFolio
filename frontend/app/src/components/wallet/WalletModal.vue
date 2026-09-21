<script setup lang="ts">
import type { Connector } from '@wagmi/vue';
import { ROBINHOOD_RPC } from '@/chain/robinhood-chain';
import HfButton from '@/components/hf/HfButton.vue';
import HoodLogo from '@/components/layout/HoodLogo.vue';
import { useWalletStore } from '@/store/wallet';

const {
  open = false,
  mode = 'connect',
} = defineProps<{
  open?: boolean;
  mode?: 'connect' | 'network';
}>();

const emit = defineEmits<{
  'close': [];
  'update:open': [value: boolean];
}>();

const wallet = useWalletStore();
const dialogRef = useTemplateRef<HTMLElement>('dialogRef');
const lastConnectorId = ref('');
const copiedRpc = ref(false);

function close(): void {
  emit('update:open', false);
  emit('close');
  wallet.resetConnect();
}

function connectorIcon(connector: Connector): string {
  const id = `${connector.id} ${connector.name}`.toLowerCase();
  if (id.includes('metamask'))
    return '🦊';
  if (id.includes('walletconnect'))
    return '⬡';
  return '💳';
}

function pickConnector(connector: Connector): void {
  lastConnectorId.value = connector.id;
  wallet.resetConnect();
  wallet.connect({ connector });
}

async function copyRpc(): Promise<void> {
  await navigator.clipboard.writeText(ROBINHOOD_RPC);
  copiedRpc.value = true;
  setTimeout(() => {
    copiedRpc.value = false;
  }, 1600);
}

function focusables(): HTMLElement[] {
  if (!dialogRef.value)
    return [];
  return [...dialogRef.value.querySelectorAll<HTMLElement>(
    'button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])',
  )];
}

function onKeydown(event: KeyboardEvent): void {
  if (!open)
    return;
  if (event.key === 'Escape') {
    close();
    return;
  }
  trapTab(event);
}

function trapTab(event: KeyboardEvent): void {
  if (event.key !== 'Tab')
    return;

  const nodes = focusables();
  const first = nodes[0];
  const last = nodes.at(-1);
  if (!first || !last)
    return;

  const wrapForward = !event.shiftKey && document.activeElement === last;
  const wrapBack = event.shiftKey && document.activeElement === first;
  if (!wrapForward && !wrapBack)
    return;

  event.preventDefault();
  (wrapBack ? last : first).focus();
}

watch(() => open, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    dialogRef.value?.querySelector<HTMLElement>('button')?.focus();
  }
});

watch(() => wallet.isConnected, (connected) => {
  if (connected && mode === 'connect')
    close();
});

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="hf-modal-root"
    >
      <div
        class="hf-modal-backdrop"
        @click="close()"
      />
      <div
        ref="dialogRef"
        class="hf-modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hf-wallet-title"
      >
        <button
          type="button"
          class="hf-modal__x"
          aria-label="Close"
          @click="close()"
        >
          ×
        </button>

        <template v-if="mode === 'connect'">
          <HoodLogo
            class="hf-modal__logo"
            height="28px"
          />
          <h2
            id="hf-wallet-title"
            class="hf-modal__title"
          >
            Connect your wallet
          </h2>
          <p class="hf-modal__sub">
            Connect to Robinhood Chain (ID: 4663)
          </p>

          <div class="hf-modal__options">
            <HfButton
              v-for="connector in wallet.connectors"
              :key="connector.uid"
              variant="secondary"
              size="md"
              full-width
              :loading="wallet.isConnecting && lastConnectorId === connector.id"
              @click="pickConnector(connector)"
            >
              <template #leftIcon>
                <span>{{ connectorIcon(connector) }}</span>
              </template>
              {{ connector.name }}
            </HfButton>
          </div>

          <p
            v-if="wallet.connectError"
            class="hf-modal__error"
          >
            {{ wallet.connectError.message }}
          </p>
          <div class="hf-modal__add-chain">
            <HfButton
              variant="secondary"
              size="md"
              full-width
              :loading="wallet.isSwitching"
              @click="wallet.switchToRobinhood()"
            >
              Add Robinhood Chain (4663)
            </HfButton>
          </div>
        </template>

        <template v-else>
          <h2
            id="hf-wallet-title"
            class="hf-modal__title"
          >
            Wrong network
          </h2>
          <p class="hf-modal__sub">
            HoodFolio only reads Robinhood Chain (ID: 4663). Switch MetaMask to this network:
          </p>
          <ul class="hf-modal__rpc">
            <li>Network name: Robinhood Chain</li>
            <li>Chain ID: 4663</li>
            <li>
              RPC:
              <button
                type="button"
                class="hf-modal__copy"
                @click="copyRpc()"
              >
                {{ copiedRpc ? 'Copied' : ROBINHOOD_RPC }}
              </button>
            </li>
            <li>Currency: ETH</li>
          </ul>
          <HfButton
            variant="primary"
            size="md"
            full-width
            :loading="wallet.isSwitching"
            @click="wallet.switchToRobinhood()"
          >
            Switch to Robinhood Chain
          </HfButton>
          <a
            class="hf-modal__note"
            href="https://robinhoodchain.blockscout.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Blockscout explorer ↗
          </a>
        </template>

        <p class="hf-modal__note">
          HoodFolio is read-only. We never request transaction signing
          unless you initiate a trade on Uniswap.
        </p>
        <button
          type="button"
          class="hf-modal__cancel"
          @click="close()"
        >
          Cancel
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.hf-modal-root {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.hf-modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgb(10 10 10 / 0.45);
}

.hf-modal {
  position: relative;
  z-index: 1;
  width: min(420px, 100%);
  padding: 24px;
}

.hf-modal__x {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  color: var(--hf-ink-3);
  font-size: 22px;
  cursor: pointer;
}

.hf-modal__title {
  font-family: var(--font-ui);
  font-size: 20px;
  font-weight: 600;
  color: var(--hf-ink);
  margin-bottom: 6px;
  padding-right: 28px;
}

.hf-modal__logo {
  margin-bottom: 12px;
}

.hf-modal__sub {
  font-size: 13px;
  color: var(--hf-ink-3);
  margin-bottom: 16px;
}

.hf-modal__options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hf-modal__add-chain {
  margin-top: 12px;
}

.hf-modal__error {
  margin-top: 12px;
  font-size: 13px;
  color: var(--hf-red);
}

.hf-modal__rpc {
  margin: 0 0 16px;
  padding-left: 18px;
  font-size: 13px;
  color: var(--hf-ink-2);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hf-modal__copy {
  display: inline;
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--hf-blue);
  cursor: pointer;
  font: inherit;
  word-break: break-all;
  text-align: left;
}

.hf-modal__note {
  margin-top: 16px;
  font-size: 12px;
  color: var(--hf-ink-4);
  line-height: 1.45;
}

.hf-modal__cancel {
  display: block;
  margin: 12px auto 0;
  border: 0;
  background: transparent;
  color: var(--hf-ink-3);
  font-family: var(--font-ui);
  font-size: 13px;
  cursor: pointer;
}
</style>

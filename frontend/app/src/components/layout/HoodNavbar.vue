<script setup lang="ts">
import HfButton from '@/components/hf/HfButton.vue';
import { HOOD_NAV, isNavActive } from '@/components/layout/nav-items';
import WalletModal from '@/components/wallet/WalletModal.vue';
import { useWalletStore } from '@/store/wallet';

const route = useRoute();
const wallet = useWalletStore();
const menuOpen = ref(false);
const navRoot = useTemplateRef<HTMLElement>('navRoot');
const modalOpen = ref(false);
const modalMode = ref<'connect' | 'network'>('connect');
const menuRef = useTemplateRef<HTMLElement>('menuRef');
const accountOpen = ref(false);
const copied = ref(false);

function closeMenu(): void {
  menuOpen.value = false;
}

function toggleMenu(): void {
  menuOpen.value = !menuOpen.value;
}

function openConnect(): void {
  modalMode.value = 'connect';
  modalOpen.value = true;
}

function openNetwork(): void {
  modalMode.value = 'network';
  modalOpen.value = true;
}

function toggleAccount(): void {
  accountOpen.value = !accountOpen.value;
}

async function copyAddress(): Promise<void> {
  if (!wallet.address)
    return;
  await navigator.clipboard.writeText(wallet.address);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 1600);
}

function disconnect(): void {
  wallet.disconnect();
  accountOpen.value = false;
}

onClickOutside(navRoot, () => {
  accountOpen.value = false;
  menuOpen.value = false;
});

watch(() => route.path, closeMenu);
</script>

<template>
  <header
    ref="navRoot"
    class="hood-nav"
  >
    <div class="hood-nav__inner">
      <RouterLink
        to="/"
        class="hood-nav__logo"
        @click="closeMenu()"
      >
        <span class="hood-nav__mark">📊</span>
        <span class="hood-nav__word">
          <span class="hood-nav__hood">Hood</span>
          <span class="hood-nav__folio">Folio</span>
        </span>
      </RouterLink>

      <nav
        class="hood-nav__links"
        aria-label="Primary"
      >
        <RouterLink
          v-for="item in HOOD_NAV"
          :key="item.href"
          :to="item.href"
          class="hood-nav__link"
          :class="{ 'hood-nav__link--active': isNavActive(route.path, item.href) }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="hood-nav__right">
        <template v-if="!wallet.isConnected">
          <span
            class="hood-nav__chain"
            title="Robinhood Chain — 100ms block time — Arbitrum L2"
          >
            <span class="live-dot" />
            <span>Chain 4663</span>
          </span>
          <HfButton
            class="hood-nav__wallet"
            variant="primary"
            size="sm"
            @click="openConnect()"
          >
            <template #leftIcon>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2.3" />
                <path d="M15 12a1 1 0 0 0 0 2" />
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
              </svg>
            </template>
            Connect Wallet
          </HfButton>
        </template>

        <HfButton
          v-else-if="!wallet.isOnRobinhoodChain"
          variant="danger"
          size="sm"
          @click="openNetwork()"
        >
          ⚠ Wrong Network
        </HfButton>

        <div
          v-else
          ref="menuRef"
          class="hood-nav__account"
        >
          <span
            class="hood-nav__chip"
            title="Robinhood Chain — 100ms block time — Arbitrum L2"
          >
            <span class="live-dot" />
            Chain 4663
          </span>
          <button
            type="button"
            class="hood-nav__addr"
            :aria-expanded="accountOpen"
            @click="toggleAccount()"
          >
            {{ wallet.ethBalance }} · {{ wallet.shortAddress }} ▾
          </button>
          <div
            v-if="accountOpen"
            class="hood-nav__drop card"
          >
            <button
              type="button"
              class="hood-nav__drop-item"
              @click="copyAddress()"
            >
              {{ copied ? 'Copied' : 'Copy address' }}
            </button>
            <button
              type="button"
              class="hood-nav__drop-item hood-nav__drop-item--danger"
              @click="disconnect()"
            >
              Disconnect
            </button>
          </div>
        </div>

        <button
          type="button"
          class="hood-nav__burger"
          :aria-expanded="menuOpen"
          aria-label="Toggle menu"
          @click="toggleMenu()"
        >
          {{ menuOpen ? '×' : '≡' }}
        </button>
      </div>
    </div>

    <Transition name="hf-menu">
      <div
        v-if="menuOpen"
        class="hood-nav__mobile"
      >
        <button
          type="button"
          class="hood-nav__mobile-close"
          aria-label="Close menu"
          @click="closeMenu()"
        >
          ×
        </button>
        <RouterLink
          v-for="item in HOOD_NAV"
          :key="`m-${item.href}`"
          :to="item.href"
          class="hood-nav__mlink"
          :class="{ 'hood-nav__link--active': isNavActive(route.path, item.href) }"
          @click="closeMenu()"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </Transition>

    <WalletModal
      v-model:open="modalOpen"
      :mode="modalMode"
    />
  </header>
</template>

<style scoped>
.hood-nav {
  position: sticky;
  top: 28px;
  z-index: 50;
  height: 60px;
  background: rgb(255 255 255 / 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--hf-border);
}

.hood-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 60px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

.hood-nav__logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  flex-shrink: 0;
}

.hood-nav__mark {
  font-size: 1.25rem;
  line-height: 1;
}

.hood-nav__word {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: 18px;
  line-height: 1;
}

.hood-nav__hood { color: var(--hf-green); }
.hood-nav__folio { color: var(--hf-ink); }

.hood-nav__links {
  display: none;
  align-items: center;
  gap: 4px;
}

.hood-nav__link,
.hood-nav__mlink {
  font-family: var(--font-ui);
  font-size: 14px;
  font-weight: 500;
  color: var(--hf-ink-3);
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 8px;
  transition: color 150ms ease, background-color 150ms ease;
}

.hood-nav__link:hover,
.hood-nav__mlink:hover {
  color: var(--hf-ink);
}

.hood-nav__link--active {
  color: var(--hf-green);
  background: var(--hf-green-bg);
}

.hood-nav__right {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.hood-nav__chain {
  display: none;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--hf-ink-4);
  cursor: help;
}

.hood-nav__wallet {
  flex-shrink: 0;
}

.hood-nav__account {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hood-nav__chip {
  display: none;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 9999px;
  background: var(--hf-green-bg);
  color: var(--hf-green-text);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
}

.hood-nav__addr {
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--hf-border);
  border-radius: 8px;
  background: var(--hf-surface);
  color: var(--hf-ink-2);
  font-family: var(--font-mono);
  font-size: 12px;
  cursor: pointer;
}

.hood-nav__drop {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  min-width: 180px;
  padding: 6px;
  z-index: 20;
}

.hood-nav__drop-item {
  display: block;
  width: 100%;
  padding: 8px 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  text-align: left;
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--hf-ink-2);
  cursor: pointer;
}

.hood-nav__drop-item:hover {
  background: var(--hf-surface-2);
}

.hood-nav__drop-item--danger {
  color: var(--hf-red);
}

.hood-nav__burger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--hf-border);
  border-radius: 8px;
  background: var(--hf-surface);
  color: var(--hf-ink);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.hood-nav__mobile {
  position: absolute;
  left: 0;
  right: 0;
  top: 60px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px 16px;
  background: var(--hf-surface);
  border-bottom: 1px solid var(--hf-border);
  box-shadow: var(--shadow-raised);
}

.hood-nav__mobile-close {
  align-self: flex-end;
  width: 32px;
  height: 32px;
  border: 0;
  background: transparent;
  color: var(--hf-ink-2);
  font-size: 24px;
  cursor: pointer;
}

.hood-nav__mlink {
  padding: 10px 12px;
}

.hf-menu-enter-active,
.hf-menu-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.hf-menu-enter-from,
.hf-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (min-width: 1024px) {
  .hood-nav__links,
  .hood-nav__chain,
  .hood-nav__chip {
    display: flex;
  }

  .hood-nav__burger,
  .hood-nav__mobile {
    display: none;
  }
}
</style>

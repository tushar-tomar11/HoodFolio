<script setup lang="ts">
import HoodLogo from '@/components/layout/HoodLogo.vue';
import { HOOD_NAV } from '@/components/layout/nav-items';
</script>

<template>
  <footer class="hood-footer">
    <div class="hood-footer__grid">
      <div>
        <RouterLink
          to="/"
          class="hood-footer__brand"
        >
          <HoodLogo height="36px" />
        </RouterLink>
        <p class="hood-footer__tag">
          Your Robinhood Chain Portfolio, On-Chain.
        </p>
        <p class="hood-footer__meta">
          Non-custodial · Read-only · Forked from rotki
        </p>
        <p class="hood-footer__meta">
          Chain 4663 · ETH gas · Arbitrum L2
        </p>
      </div>

      <nav aria-label="Footer">
        <p class="hood-footer__h">
          Quick links
        </p>
        <ul class="hood-footer__list">
          <li
            v-for="item in HOOD_NAV"
            :key="item.href"
          >
            <a
              v-if="item.external"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ item.label }} ↗
            </a>
            <RouterLink
              v-else
              :to="item.href"
            >
              {{ item.label }}
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ path: '/', hash: '#faq' }">
              FAQ
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div>
        <p class="hood-footer__h">
          External
        </p>
        <ul class="hood-footer__list">
          <li>
            <a
              href="https://robinhoodchain.blockscout.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blockscout Explorer ↗
            </a>
          </li>
          <li>
            <a
              href="https://app.morpho.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Morpho ↗
            </a>
          </li>
          <li>
            <a
              href="https://github.com/rotki/rotki"
              target="_blank"
              rel="noopener noreferrer"
            >
              rotki (upstream) ↗
            </a>
          </li>
          <li>
            <a
              href="https://app.uniswap.org/swap?chain=4663"
              target="_blank"
              rel="noopener noreferrer"
            >
              Uniswap on Robinhood Chain ↗
            </a>
          </li>
        </ul>
      </div>
    </div>

    <p class="hood-footer__legal">
      HoodFolio © 2026 · Forked from rotki (AGPL-3.0) · Not financial advice ·
      Premium/discount data is informational only
    </p>
  </footer>
</template>

<style scoped>
.hood-footer {
  background: var(--hf-surface);
  border-top: 1px solid var(--hf-border);
  padding: 40px 16px 24px;
}

.hood-footer__grid {
  display: grid;
  gap: 32px;
  max-width: 1280px;
  margin: 0 auto 32px;
}

.hood-footer__brand {
  display: inline-block;
  margin-bottom: 12px;
  text-decoration: none;
}

.hood-footer__tag {
  font-family: var(--font-ui);
  font-size: 14px;
  color: var(--hf-ink-2);
  margin-bottom: 12px;
}

.hood-footer__meta {
  font-size: 13px;
  color: var(--hf-ink-3);
}

.hood-footer__h {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--hf-ink-3);
  margin-bottom: 12px;
}

.hood-footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hood-footer__list a {
  font-size: 14px;
  color: var(--hf-ink-2);
  text-decoration: none;
}

.hood-footer__list a:hover {
  color: var(--hf-green);
}

.hood-footer__legal {
  max-width: 1280px;
  margin: 0 auto;
  padding-top: 16px;
  border-top: 1px solid var(--hf-border);
  font-size: 12px;
  color: var(--hf-ink-4);
}

@media (min-width: 768px) {
  .hood-footer__grid {
    grid-template-columns: 1.4fr 1fr 1.2fr;
  }
}
</style>

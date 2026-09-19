<script setup lang="ts">
import { useToast } from '@/composables/use-toast';
import { explorerUrl, truncateAddress } from '@/utils/formatting';

const {
  address,
  short = true,
  copyable = true,
  explorer = true,
} = defineProps<{
  address: string;
  short?: boolean;
  copyable?: boolean;
  explorer?: boolean;
}>();

const copied = ref(false);
let copyTimer: ReturnType<typeof setTimeout> | undefined;
const toast = useToast();

const display = computed(() =>
  short ? truncateAddress(address) : address,
);

const href = computed(() => explorerUrl(address, 'address'));

async function copyAddress(): Promise<void> {
  try {
    await navigator.clipboard.writeText(address);
    copied.value = true;
    toast.show('📋 Address copied', 'success');
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
  catch {
    copied.value = false;
  }
}

onUnmounted(() => {
  clearTimeout(copyTimer);
});
</script>

<template>
  <span class="hf-addr">
    <span
      class="mono hf-addr__text"
      :title="address"
    >
      {{ display }}
    </span>
    <button
      v-if="copyable"
      type="button"
      class="hf-addr__btn"
      :aria-label="copied ? 'Copied' : 'Copy address'"
      @click.stop="copyAddress()"
    >
      <svg
        v-if="!copied"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <rect
          width="14"
          height="14"
          x="8"
          y="8"
          rx="2"
          ry="2"
        />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
      <svg
        v-else
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </button>
    <a
      v-if="explorer"
      class="hf-addr__btn"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open in Blockscout"
      @click.stop
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    </a>
  </span>
</template>

<style scoped>
.hf-addr {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--hf-ink-3);
  font-size: 12px;
  line-height: 1;
  vertical-align: middle;
}

.hf-addr__text {
  letter-spacing: -0.01em;
}

.hf-addr__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: color 150ms ease, background-color 150ms ease;
}

.hf-addr__btn:hover {
  color: var(--hf-green);
  background: var(--hf-green-bg);
}
</style>

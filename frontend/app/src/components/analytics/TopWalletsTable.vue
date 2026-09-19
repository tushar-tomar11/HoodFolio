<script setup lang="ts">
import type { TopWalletRow } from '@/chain/mock-chain-stats';
import HfAddressChip from '@/components/hf/HfAddressChip.vue';
import { formatUSDCompact } from '@/utils/formatting';

defineProps<{
  wallets: TopWalletRow[];
}>();
</script>

<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Address</th>
        <th>Label</th>
        <th class="col-right">
          Total value
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="row in wallets"
        :key="row.address"
      >
        <td class="num">
          {{ row.rank }}
        </td>
        <td>
          <RouterLink
            class="tw-link"
            :to="`/wallet/${row.address}`"
          >
            <HfAddressChip
              :address="row.address"
              :explorer="false"
            />
          </RouterLink>
        </td>
        <td>{{ row.label }}</td>
        <td class="col-right num">
          {{ formatUSDCompact(row.totalValueUSD) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.tw-link {
  text-decoration: none;
}
</style>

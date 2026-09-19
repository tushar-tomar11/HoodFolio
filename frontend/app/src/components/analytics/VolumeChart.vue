<script setup lang="ts">
import type { IChartApi } from 'lightweight-charts';
import type { DailyVolumePoint } from '@/chain/mock-chain-stats';

const { points } = defineProps<{
  points: DailyVolumePoint[];
}>();

const host = useTemplateRef<HTMLDivElement>('chartHost');
let chart: IChartApi | undefined;

function millionLabel(price: number): string {
  return `$${price.toFixed(1)}M`;
}

async function boot(): Promise<void> {
  const el = host.value;
  if (!el)
    return;

  const { ColorType, createChart, HistogramSeries } = await import('lightweight-charts');
  const instance = createChart(el, {
    autoSize: true,
    height: 220,
    layout: {
      attributionLogo: false,
      background: { color: '#FFFFFF', type: ColorType.Solid },
      fontFamily: 'Inter, system-ui, sans-serif',
      textColor: '#8A8D91',
    },
    grid: {
      horzLines: { visible: false },
      vertLines: { visible: false },
    },
    rightPriceScale: { borderVisible: false },
    timeScale: { borderVisible: false },
  });

  const series = instance.addSeries(HistogramSeries, {
    color: '#00C805',
    priceFormat: {
      type: 'custom',
      formatter: millionLabel,
      minMove: 0.1,
    },
  });

  series.setData(points.map(point => ({
    time: point.date,
    value: point.volumeUSD / 1_000_000,
  })));

  instance.timeScale().fitContent();
  chart = instance;
}

onMounted(() => {
  boot().catch(() => undefined);
});

onUnmounted(() => {
  chart?.remove();
  chart = undefined;
});
</script>

<template>
  <div
    ref="chartHost"
    class="vol-chart"
  />
</template>

<style scoped>
.vol-chart {
  width: 100%;
  height: 220px;
}
</style>

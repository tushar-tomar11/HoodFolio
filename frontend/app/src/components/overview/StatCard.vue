<script setup lang="ts">
import HfSkeleton from '@/components/hf/HfSkeleton.vue';
import MiniSparkline from '@/components/overview/MiniSparkline.vue';

const {
  icon = 'grid',
  value,
  label,
  sparkline = [],
  loading = false,
} = defineProps<{
  icon?: 'database' | 'bars' | 'arrows' | 'grid';
  value: string;
  label: string;
  sparkline?: number[];
  loading?: boolean;
}>();
</script>

<template>
  <div class="stat-card card">
    <div
      class="stat-card-icon"
      aria-hidden="true"
    >
      <svg
        v-if="icon === 'database'"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <ellipse
          cx="12"
          cy="5"
          rx="9"
          ry="3"
        />
        <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" />
        <path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
      </svg>
      <svg
        v-else-if="icon === 'bars'"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
      <svg
        v-else-if="icon === 'arrows'"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M8 7H4m0 0 3-3M4 7l3 3M16 17h4m0 0-3-3m3 3-3 3" />
      </svg>
      <svg
        v-else
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
        />
      </svg>
    </div>

    <div class="stat-card-content">
      <HfSkeleton
        v-if="loading"
        height="28px"
        width="88px"
      />
      <div
        v-else
        class="stat-card-number num"
      >
        {{ value }}
      </div>
      <div class="stat-card-label">
        {{ label }}
      </div>
    </div>

    <MiniSparkline
      class="stat-card-sparkline"
      :data="sparkline"
    />
  </div>
</template>

<style scoped>
.stat-card {
  background: var(--hf-stat-bg);
  border: 1px solid var(--hf-stat-border);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-card-icon {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--hf-stat-icon-bg);
  align-items: center;
  justify-content: center;
  color: var(--hf-green);
  flex-shrink: 0;
}

.stat-card-sparkline {
  display: none;
  width: 60px;
  height: 32px;
  flex-shrink: 0;
}

.stat-card-content {
  flex: 1;
  min-width: 0;
}

.stat-card-number {
  font-family: var(--font-num);
  font-size: 32px;
  font-weight: 700;
  color: var(--hf-stat-num);
  margin-bottom: 6px;
  line-height: 1.1;
}

.stat-card-label {
  font-family: var(--font-ui);
  font-size: 13px;
  color: var(--hf-stat-label);
  font-weight: 500;
}
</style>

<style>
html.dark .stat-card-icon {
  display: inline-flex;
}

html.dark .stat-card-sparkline {
  display: block;
}
</style>

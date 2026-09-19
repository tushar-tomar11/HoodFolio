<script setup lang="ts">
import HfButton from '@/components/hf/HfButton.vue';

const {
  title,
  body,
  actionLabel = '',
} = defineProps<{
  title: string;
  body: string;
  actionLabel?: string;
}>();

const emit = defineEmits<{
  action: [];
}>();
</script>

<template>
  <div class="card hf-status">
    <p class="hf-status__t">
      {{ title }}
    </p>
    <p class="hf-status__b">
      {{ body }}
    </p>
    <HfButton
      v-if="actionLabel"
      variant="primary"
      size="sm"
      @click="emit('action')"
    >
      {{ actionLabel }}
    </HfButton>
  </div>
</template>

<style scoped>
.hf-status {
  padding: 24px;
  text-align: center;
}

.hf-status__t {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 8px;
}

.hf-status__b {
  font-size: 14px;
  color: var(--hf-ink-3);
  margin-bottom: 16px;
  line-height: 1.5;
}
</style>

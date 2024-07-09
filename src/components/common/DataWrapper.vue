<template>
  <div class="data-wrapper">
    <p v-if="loading">{{ t('loading') }}</p>
    <p v-else-if="error">{{ t(error) }}</p>
    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

export interface Props {
  loading: boolean
  error: string | null
}

defineProps<Props>()

const { t } = useI18n()
</script>

<style scoped lang="scss">
.data-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}
</style>

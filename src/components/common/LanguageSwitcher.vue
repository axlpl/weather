<template>
  <div class="language-switcher">
    <UiButton
      @click="toggleLanguage"
      variant="outlined"
      role="button"
      :aria-checked="currentLanguage"
    >
      {{ currentLanguage === 'pl' ? 'EN' : 'PL' }}
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import UiButton from '@/components/common/UiButton.vue'

const { locale, t } = useI18n()
const currentLanguage = computed(() => locale.value)

const toggleLanguage = (): void => {
  const newLanguage = currentLanguage.value === 'pl' ? 'en' : 'pl'
  locale.value = newLanguage
  document.title = t('title')
}
</script>

<style scoped lang="scss">
.language-switcher {
  position: absolute;
  top: 2.5rem;
  right: 2rem;

  @media (min-width: #{$desktop-width}) {
    top: 1rem;
    right: 1rem;
  }
}
</style>

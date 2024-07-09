<script setup lang="ts">
import { RouterView } from 'vue-router'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
</script>

<template>
  <div>
    <LanguageSwitcher />
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive>
          <Suspense>
            <component :is="Component"></component>
            <template #fallback> Loading... </template>
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
  </div>
</template>

<style scoped></style>

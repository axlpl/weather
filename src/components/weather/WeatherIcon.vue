<template>
  <img :src="iconUrl" alt="Weather Icon" class="weather-icon" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  icon: string
}

const props = defineProps<Props>()
const iconUrl = computed(() => `http://openweathermap.org/img/wn/${props.icon}@2x.png`)
</script>

<style scoped lang="scss">
.weather-icon {
  width: 3.125rem;
  height: 3.125rem;
}
</style>

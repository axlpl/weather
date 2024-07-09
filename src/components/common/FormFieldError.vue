<template>
  <Transition>
    <div v-if="error" class="form-field-error">
      <p>{{ error }}</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
export interface Props {
  error: string | null
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.form-field-error {
  color: red;
  font-size: var(--font-size-base);
  margin-top: 0.5rem;
}
</style>

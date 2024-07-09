<template>
  <div class="text-input">
    <label :for="id" class="text-input__label">{{ label }}</label>
    <input
      :id="id"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      class="text-input__input"
      :disabled="disabled"
    />
    <FormFieldError :error="error" />
  </div>
</template>

<script setup lang="ts">
import FormFieldError from '@/components/common/FormFieldError.vue'

export interface Props {
  id: string
  label: string
  modelValue: string
  type?: string
  placeholder?: string
  error?: string | null
  disabled?: boolean
}

const inputValue = defineModel()

withDefaults(defineProps<Props>(), {
  error: null,
  type: 'text',
  disabled: false
})
</script>

<style scoped lang="scss">
.text-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  &__label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  &__input {
    padding: 0.5rem;
    font-size: var(--font-size-base);
    border: 0.0625rem solid var(--secondary-color);
    border-radius: 0.25rem;
  }
}
</style>

<template>
  <button :class="buttonClasses" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
  type?: string
  variant?: 'normal' | 'outlined'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'normal',
  type: 'button',
  disabled: false
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  return {
    button: true,
    'button--outlined': props.variant === 'outlined',
    'button--normal': props.variant === 'normal'
  }
})

const handleClick = (event: Event) => {
  emit('click', event)
}
</script>

<style scoped lang="scss">
.button {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-base);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  transition:
    background-color 0.3s,
    color 0.3s;

  &--normal {
    background-color: var(--primary-color);
    color: white;

    &:hover {
      background-color: var(--primary-color-hover);
      color: var(--primary-color);
    }
  }

  &--outlined {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);

    &:hover {
      background-color: var(--primary-color);
      color: white;
    }
  }

  &:disabled {
    background-color: var(--secondary-color);
    color: gray;
    cursor: not-allowed;
  }
}
</style>

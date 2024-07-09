import { ref } from 'vue'

export type ValidationRule<T> = (value: T) => string | null

export interface FieldValidation<T> {
  value: T
  rules: ValidationRule<T>[]
}

export function useFormError<T>() {
  const errors = ref<Record<string, string | null>>({})

  const setError = (field: string, message: string | null) => {
    errors.value[field] = message
  }

  const getError = (field: string): string | null => {
    return errors.value[field] || null
  }

  const clearError = (field: string) => {
    delete errors.value[field]
  }

  const validateField = <T>(field: string, value: T, rules: ValidationRule<T>[]): boolean => {
    for (const rule of rules) {
      const error = rule(value)
      if (error) {
        setError(field, error)
        return false
      }
    }
    clearError(field)
    return true
  }

  const validateForm = (fields: Record<string, FieldValidation<T>>): boolean => {
    let isValid = true
    for (const [field, { value, rules }] of Object.entries(fields)) {
      if (!validateField(field, value, rules)) {
        isValid = false
      }
    }
    return isValid
  }

  return {
    errors,
    setError,
    getError,
    clearError,
    validateField,
    validateForm
  }
}

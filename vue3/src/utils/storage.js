import { ref, watchEffect } from 'vue'

export default function useStorage(key, value = []) {
  console.log('useStorage:', key, value)
  const data = ref(JSON.parse(localStorage.getItem(key) || JSON.stringify(value)))
  watchEffect(() => {
    console.log('watchEffect', key, data.value)
    localStorage.setItem(key, JSON.stringify(data.value))
  })
  return data
}

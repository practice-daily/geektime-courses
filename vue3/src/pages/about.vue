<template>
  <h1>这是关于页面 {{double}}</h1>
</template>

<script setup>
import { reactive, computed, watchEffect } from 'vue'

const obj = reactive({
  count: 1
})

const double = computed(() => obj.count * 2)

setTimeout(() => obj.count = 2, 1000)

watchEffect(() => {
  console.log('watchEffect', obj.count, double.value)
})
</script>
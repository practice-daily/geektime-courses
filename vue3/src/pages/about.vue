<template>
  <div>
    <h1>这是关于页面 {{double}}</h1>
    <Head :level="3">Hello</Head>
  </div>
</template>

<script setup>
import { reactive, computed, watchEffect } from 'vue'
import Head from '../components/Head.jsx'

const obj = reactive({
  count: 1
})

const double = computed(() => obj.count * 2)

setTimeout(() => obj.count = 2, 1000)

watchEffect(() => {
  console.log('watchEffect', obj.count, double.value)
})
</script>
<template>
  <div>
    <div>score: {{value}}</div>
    <div :style="fontStyle">
      theme: {{theme}}
      {{rate}}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: Number,
  theme: {
    type: String,
    default: 'orange',
  },
  themeObj: {
    type: Object,
    required: true,
  },
})

const rate = computed(() => '★★★★★☆☆☆☆☆'.slice(5 - props.value, 10 - props.value))

const fontStyle = computed(() => `color: ${props.themeObj[props.theme]};`)
</script>

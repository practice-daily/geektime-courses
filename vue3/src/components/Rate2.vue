<template>
  <div class="rate" @mouseout="mouseout" style="background-color: #abcdef;">
    <span v-for="num in 5" :key="num" @mouseover="mouseover(num)">☆</span>
    <span class="hollow" :style="fontWidth">
      <span v-for="num in 5" :key="num" @mouseover="mouseover(num)" @click="update(num)">★</span>
    </span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['update:modelValue'])

let clicked = false

// 评分宽度
const width = ref(props.modelValue)
const fontWidth = computed(() => `width: ${width.value}em;`)
const mouseover = num => {
  console.log('mouseover')
  width.value = num
}
function mouseout() {
  console.log('mouseout', clicked)
  if (!clicked) {
    width.value = props.modelValue
  }
  clicked = false
}

function update(num) {
  clicked = true
  emits('update:modelValue', num)
}
</script>

<style scoped>
.rate {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.hollow {
  position: absolute;
  /* display: inline-block; */
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>
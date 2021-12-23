<template>
  <h1>这是首页</h1>
  <button class="color" @click="add">{{count}} {{color}}</button>
  <Todolist></Todolist>
  <span>{{x}} / {{y}}</span>

  <p>isFullscreen: {{isFullscreen}}</p>
  <button @click="toggle">fullscreen toggle</button>
  <button @click="enter">fullscreen enter</button>
  <button @click="exit">fullscreen exit</button>
</template>

<script setup>
import { ref } from 'vue'
import Todolist from '../components/Todolist.vue';
import { useMouse } from '../utils/mouse'
import { useFullscreen } from '@vueuse/core'

const { x, y } = useMouse()

const count = ref(0)
const color = ref('red')
function add() {
  count.value++
  color.value = Math.random() > 0.5 ? 'red' : 'blue'
}

const { isFullscreen, enter, exit, toggle } = useFullscreen()
</script>

<style scoped>
.color {
  color: v-bind(color);
}
</style>
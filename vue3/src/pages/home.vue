<template>
  <h1>这是首页</h1>
  <button class="color" @click="add">{{count}} {{color}}</button>
  <Todolist></Todolist>
  <span>{{x}} / {{y}}</span>
</template>

<script setup>
import { ref } from 'vue'
import Todolist from '../components/Todolist.vue';
import { useMouse } from '../utils/mouse'

const { x, y } = useMouse()

const count = ref(0)
const color = ref('red')
function add() {
  count.value++
  color.value = Math.random() > 0.5 ? 'red' : 'blue'
}
</script>

<style scoped>
.color {
  color: v-bind(color);
}
</style>
<template>
<div>
  <h1>这是首页</h1>

  <div class="section-item">
    <button class="color" @click="add">{{count}} {{color}}</button>
    <Todolist></Todolist>
  </div>

  <div class="section-item">
    <span>{{x}} / {{y}}</span>
  </div>

  <div class="section-item">
    <p>isFullscreen: {{isFullscreen}}</p>
    <button @click="toggle">fullscreen toggle</button>
    <button @click="enter">fullscreen enter</button>
    <button @click="exit">fullscreen exit</button>
  </div>

  <div class="section-item">
    <button @click="changeScore">score: {{score}}</button>
    <Rate :value="score" :theme="theme" :themeObj="themeObj"></Rate>
    <button v-for="item in themeList" :style="{color: themeObj[item]}" @click="selectTheme(item)">{{item}}</button>
  </div>

  <div class="section-item">
    score: {{score2}}
    <Rate2 v-model="score2"></Rate2>
  </div>

  <div class="section-item">
    <button @click="handleStoreClick">store: {{storeCount}}</button>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
// import { useStore } from 'vuex'
import { useStore } from '../store/vuex'
import Todolist from '../components/Todolist.vue'
import Rate from '../components/Rate.vue'
import Rate2 from '../components/Rate2.vue'
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

const themeObj = {
  'black': '#00',
  // 'white': '#fff',
  'red': '#f5222d',
  'orange': '#fa541c',
  'yellow': '#fadb14',
  'green': '#73d13d',
  'blue': '#40a9ff',
}
const themeList = Object.keys(themeObj)
let theme = ref(undefined)
const selectTheme = _theme => theme.value = _theme

const score = ref(3)

let direction = score.value >= 5 ? -1 : 1
const changeScore = _ => {
  if (score.value === 0) {
    direction = 1
  } else if (score.value === 5) {
    direction = -1
  }
  score.value += direction
  theme.value = themeList[score.value]
}

const score2 = ref(3.5)

const store = useStore()
console.log('store:', store)
const storeCount = computed(() => store.state.count)
const handleStoreClick = () => store.commit('add', 2)
</script>

<style scoped>
.color {
  color: v-bind(color);
}

.section-item {
  margin: 5px 0;
  padding: 5px;;
  border: 1px solid #666;
}
</style>
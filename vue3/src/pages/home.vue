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
    <button
      v-for="item in themeList"
      :style="{color: themeObj[item]}"
      :key="item"
      @click="selectTheme(item)">
    {{item}}
    </button>
  </div>

  <div class="section-item">
    score: {{score2}}
    <Rate2 v-model="score2"></Rate2>
  </div>

  <div class="section-item">
    count: {{storeCount}}
    double: {{storeDouble}}
    <button @click="handleAdd">add</button>
    <button @click="handleAsyncAdd">asyncAdd</button>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useFullscreen } from '@vueuse/core'
// import { useStore } from '../store/vuex'
import Todolist from '../components/Todolist.vue'
// import Todolist from '../components/Todolist.jsx'
import Rate from '../components/Rate.vue'
import Rate2 from '../components/Rate2.vue'
import { useMouse } from '../utils/mouse'

const { x, y } = useMouse()

const count = ref(0)
const color = ref('red')
function add() {
  count.value += 1
  color.value = Math.random() > 0.5 ? 'red' : 'blue'
}

const {
  isFullscreen,
  enter,
  exit,
  toggle,
} = useFullscreen()

const themeObj = {
  black: '#00',
  // 'white': '#fff',
  red: '#f5222d',
  orange: '#fa541c',
  yellow: '#fadb14',
  green: '#73d13d',
  blue: '#40a9ff',
}
const themeList = Object.keys(themeObj)
const theme = ref(undefined)
const selectTheme = (_theme) => {
  theme.value = _theme
}

const score = ref(3)

let direction = score.value >= 5 ? -1 : 1
const changeScore = () => {
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
const storeDouble = computed(() => store.getters.double)
const handleAdd = () => store.commit('add')
const handleAsyncAdd = () => store.dispatch('asyncAdd', 2)

// 统计页面一共有多少种 HTML 标签
const ret0 = new Set([...document.querySelectorAll('*')].map((node) => node.nodeName)).size
console.log('页面 HTML 标签总数：', ret0)

// 统计页面出现次数最多的 3 种 HTML 标签
const ret1 = Object.entries([...document.querySelectorAll('*')].map((n) => n.tagName).reduce((pre, cur) => {
  pre[cur] = (pre[cur] || 0) + 1;
  return pre;
}, {})).sort((a, b) => b[1] - a[1]).slice(0, 3)
console.table(ret1)

const ret2 = Object.entries(Array.from(document.querySelectorAll('*')).reduce((res, { tagName }) => ((tagName in res) ? (res[tagName] ++ ) : (res[tagName] = 1), res), {})).sort(([tagNameA, countA], [tagNameB, countB]) => countB - countA).map(([tagName]) => tagName).slice(0, 3)
console.table(ret2)
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

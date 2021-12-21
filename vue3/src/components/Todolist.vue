<template>
  <div>
    <input type="text" v-model="title" @keyup.enter="addTodo">
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <li v-for="item in todos">
        <input type="checkbox" v-model="item.done" />
        <span :class="{done: item.done}">{{item.title}}</span>
      </li>
    </ul>
    <div v-else>暂无数据</div>

    <div>
      全选 <input type="checkbox" v-model="allDone">
      <span>{{active}} / {{all}}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

function useTodos() {
  const title = ref('')
  let todos = ref([
    { title: 'learn vue3', done: false }
  ])
  
  function addTodo() {
    todos.value.push({
      title: title.value,
      done: false
    })
    title.value = ''
  }

  function clear() {
    todos.value = todos.value.filter(item => !item.done)
  }
  
  const active = computed(() => todos.value.filter(item => !item.done).length)
  const all = computed(() => todos.value.length)
  const allDone = computed({
    get() {
      return active.value === 0
    },
    set(val) {
      todos.value.forEach(item => item.done = val)
    }
  })

  return { title, todos, addTodo, clear, active, all, allDone }
}

let { title, todos, addTodo, clear, active, all, allDone } = useTodos()
</script>

<style scoped>
.done {
  text-decoration: line-through;
  color: #999;
}
</style>

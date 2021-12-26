<template>
  <div>
    <input type="text" v-model="title" @keyup.enter="addTodo">
    <button v-if="active < all" @click="clear">清理</button>

    <span class="dustbin" id="dustbin">🗑</span>
    <div class="animate-wrap">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="animate" v-show="animate.show">📋</div>
      </transition>
    </div>

    <ul v-if="todos.length">
      <transition-group name="flip-list">
        <!-- 列表过渡 transition-group 内部元素总是需要提供唯一的 key attribute 值 -->
        <li v-for="(item, index) in todos" :key="item.id">
          <input type="checkbox" v-model="item.done" />
          <span :class="{done: item.done}">{{item.title}}</span>
          <span class="remove-btn" @click="removeTodo($event, index)">❌</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>

    <div>
      全选 <input type="checkbox" v-model="allDone">
      <span>{{active}} / {{all}}</span>
    </div>
  </div>

  <transition name="modal">
    <div class="info-wrapper" v-if="showModal">
      <div class="info">哥，你啥也没输入！</div>
    </div>
  </transition>
</template>

<script setup>
  import { ref, computed, reactive, nextTick } from 'vue'
  import useStorage from '../utils/storage'

  const title = ref('')
  const showModal = ref(false)

  const todos = useStorage('todos_useStorage', [ { title: 'Let\'s learn vue3', done: false } ])
  console.log('todos_useStorage:', todos)

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

  let id = 0
  function addTodo() {
    if (!title.value) {
      showModal.value = true
      setTimeout(() => {
        showModal.value = false
      }, 2000)
      return
    }
    todos.value.push({
      id: id++,
      title: title.value,
      done: false
    })
    title.value = ''
  }

  function clear() {
    todos.value = todos.value.filter(item => !item.done)
  }

  function useAnimation() {
    let dx = 0
    let dy = 0
    const targetEl = {
      left: 0,
      top: 0,
    }
    nextTick(() => {
      const el = document.getElementById('dustbin')
      const rect = el.getBoundingClientRect()
      targetEl.left = rect.left
      targetEl.top = rect.top
      console.log('垃圾桶：', rect)
    })

    const animate = reactive({
      show: false,
      el: null
    })

    function beforeEnter(el) {
      const { left, top } = animate.el.getBoundingClientRect()

      // const x = window.innerWidth - left - 60
      // const y = top - 10
      // el.style.transform = `translate(${-x}px, ${y}px)`

      el.style.left = `${left}px`
      el.style.top = `${top}px`

      dx = targetEl.left - left
      dy = targetEl.top - top
      console.log(`beforeEnter dx: ${dx} = ${targetEl.left} - ${left}`)
      console.log(`beforeEnter dy: ${dy} = ${targetEl.top} - ${top}`)
    }
    function enter(el, done) {
      document.body.offsetHeight // 手动触发一次重绘，开始动画
      el.addEventListener('transitionend', done)
      // el.style.transform = 'translate(0, 0)'
      el.style.transform = `translate(${dx}px, ${dy}px)`
      // setTimeout(done, 500)
    }
    function afterEnter(el) {
      animate.show = false
      el.style.display = 'none'
    }

    function removeTodo(e, i) {
      animate.el = e.target
      animate.show = true
      // todos.value.splice(i, 1)
      nextTick(() => {
        todos.value.splice(i, 1)
      })
    }

    return { animate, beforeEnter, enter, afterEnter, removeTodo }
  }

  const { animate, beforeEnter, enter, afterEnter, removeTodo } = useAnimation()
</script>

<style scoped>
.done {
  text-decoration: line-through;
  color: #999;
}

.info-wrapper {
  position: fixed;
  top: 20px;
  width:200px;
}
.info {
  padding: 20px;
  color: white;
  background: #d88986;
}

.modal-enter-from, .modal-leave-to {
  transform: translateY(-60px);
}
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.flip-list-enter-from, .flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.flip-list-enter-active, .flip-list-leave-active {
  transition: all 1s ease;
}
.flip-list-move {
  transition: all 0.8s ease;
}

.animate-wrap .animate{
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
  transition: all 0.5s linear;
}
</style>
